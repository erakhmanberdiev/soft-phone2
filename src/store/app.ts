// Utilities
import {defineStore} from 'pinia'
import {ref, toRaw} from "vue";
import {UA, WebSocketInterface} from "jssip";
import {AnswerOptions, RTCSession, RTCSessionEventMap} from "jssip/lib/RTCSession";
import {CallOptions, IncomingRTCSessionEvent} from "jssip/lib/UA";

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
      isIncommingCall:false,
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
    getIsIncommingCall():boolean{
      return toRaw(this.isIncommingCall);
    }
  },
  actions: {
    setAudioplayer(audioPlayer:HTMLAudioElement){
      this.audioPlayer=audioPlayer;
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
      ua?.on("newRTCSession",(event)=>{
        this.setIsIncommingCall(true);
        if(event.session.isInProgress()){
          this.setSession(event.session)
          const session:RTCSession=event.session;


        }


      });
      ua?.on('registered', (e) => this.regStatus = "success");
      ua?.on('unregistered', (e) => this.regStatus = "error");
      ua?.on('registrationFailed', (e) => this.regStatus = "warning");

      ua.start();

      this.ua = ua;


    },
    setIsIncommingCall(flg:boolean){
      this.isIncommingCall=flg;
    },
    answerCall(session) {
      if (session && session.isInProgress()) {
        // Проверяем, что сессия активна и находится в состоянии "входящего вызова"

        const options = {
          mediaConstraints: { audio: true, video: false }, // Опционально, задайте требуемые ограничения медиа (здесь только аудио)
        };

        session.answer(options);
        console.log("Вы успешно приняли вызов!");
      } else {
        console.log("Невозможно принять вызов. Некорректное состояние сессии.");
      }
    },
    makeCall (phoneNumber:string) {

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
          const audio= toRaw(this.audioPlayer);
         audio!.srcObject=toRaw(this.session)!.connection.getRemoteStreams()[0];
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
        mediaConstraints: { audio: true, video: false }, // Опционально, задайте требуемые ограничения медиа (здесь только аудио)
      };
      session?.answer(options)
    },
    hangupCall() {
      console.log("session.terminate", this.session)
      if (this.session) {
        toRaw(this.session).terminate();
      }
    },

  },
});
