// Utilities
import {defineStore} from 'pinia'
import {toRaw} from "vue";
import {UA, WebSocketInterface} from "jssip";
import {Originator, RTCSession, RTCSessionEventMap} from "jssip/lib/RTCSession";
import {CallOptions} from "jssip/lib/UA";

export const useAppStore = defineStore('app', {
  state: () => ({
    //
  }),
});


export const useSipStore = defineStore('sip', {
  state: () => {
    return {
      audioPlayer: HTMLAudioElement | null,
      ua: null as UA | null,
      session: null as RTCSession | null,
      regStatus: "error",
      isIncommingCall: false,
      isCalling: false,
    }
  },
  getters: {
    getSession(): RTCSession | null {
      return toRaw(this.$state.session);
    },
    userAgent(): UA | null {
      return toRaw(this.ua);
    },
    getRegStatus(): string {
      return toRaw(this.regStatus);
    },
    getIsIncommingCall(): boolean {
      return toRaw(this.isIncommingCall);
    },
    getIsCalling() {
      return toRaw(this.isCalling)
    }
  },
  actions: {
    setAudioplayer(audioPlayer: HTMLAudioElement) {
      this.audioPlayer = audioPlayer;
    },

    setSession(session: RTCSession | null) {
      this.session = session;
    },

    async registration(ws_url: string, sip_uri: string, password: string, audioPlayer: HTMLAudioElement) {
      this.setAudioplayer(audioPlayer);
      const userAgent = toRaw(this.ua);

      if (userAgent) {
        userAgent.stop();
      }


      const socket = new WebSocketInterface(ws_url);
      const configuration = {
        sockets: [socket],
        uri: sip_uri,//'sip:alice@example.com',
        password: password,
      };
      // console.log(configuration);
      const ua = new UA(configuration);

      this.addUaEvents(ua);
      ua.start();

      this.ua = ua;


    },

    setIsIncommingCall(flg: boolean) {
      this.isIncommingCall = flg;
    },
    setIsCalling(flg: boolean) {
      this.isCalling = flg;
    },

    makeCall(phoneNumber: string) {

      const userAgent: UA | null = this.userAgent;

      if (!userAgent) {
        console.error('JsSIP is not initialized.');
        return;
      }

      const eventHandlers: Partial<RTCSessionEventMap> = {
        progress: (e) => {

          console.log('call is in progress');
        },
        failed: (e) => {
          console.log('call failed with cause: ' + e);
        },
        ended: (e) => {
          console.log('call ended with cause: ' + e);
        },
        confirmed: (e) => {
          const audio = toRaw(this.audioPlayer);
          audio!.srcObject = toRaw(this.session)!.connection.getRemoteStreams()[0];
          audio!.play();


          console.log('call confirmed');
        },


      };

      const options: CallOptions = {
        eventHandlers: eventHandlers,
        mediaConstraints: {'audio': true, 'video': false},
        // mediaStream:new MediaStream(),
      };
      console.log(userAgent, phoneNumber)
      this.setSession(
        userAgent.call(phoneNumber, options)
      );
    },

    answer() {
      const session = this.getSession;
      const options = {
        mediaConstraints: {audio: true, video: false}, // Опционально, задайте требуемые ограничения медиа (здесь только аудио)
      };
      session?.answer(options)
    },

    hangupCall() {
      console.log("session.terminate", this.session)
      if (this.session) {
        toRaw(this.session).terminate();
      }
    },

    mute(){
      const session=this.getSession;

      session?.mute({audio:true,video:true});
    },
    unmute(){
      const session=this.getSession;

      session?.unmute({audio:true,video:false});
    },
    hold(){
      const session=this.getSession;
      session?.hold();
    },
    unhold(){
      const session=this.getSession;
      session?.unhold({useUpdate:true});
    },

    addUaEvents(ua: UA) {


      ua.on("newRTCSession", (event) => {
          this.setSession(event.session)
          this.addSessionEvents(event.session,event.originator);

      });
      ua.on('registered', (e) => this.regStatus = "success");
      ua.on('unregistered', (e) => this.regStatus = "error");
      ua.on('registrationFailed', (e) => this.regStatus = "warning");
    },
    addSessionEvents(session: RTCSession,originator:Originator) {

      if(originator==='local'){
        this.setIsCalling(true);
        // session.on("accepted",(event)=>{});
        // session.on("accepted",(event)=>{});
        // session.on("accepted",(event)=>{});
      }
      if(originator==='remote'){
        this.setIsIncommingCall(true);
        session.on("accepted",(event)=>{
          this.setIsIncommingCall(false);
          this.setIsCalling(true);
        });
        // session.on("accepted",(event)=>{});
        // session.on("accepted",(event)=>{});
      }
      session.on("confirmed",(event)=>{
        const audio = toRaw(this.audioPlayer);
        audio!.srcObject = session!.connection.getRemoteStreams()[0];
        audio!.play();
      });
      session.on("ended", () => {
        this.setIsIncommingCall(false);
        this.setIsCalling(false);
      });

      session.on("failed", () => {
        this.setIsIncommingCall(false);
        this.setIsCalling(false);
      });


    }

  },
});
