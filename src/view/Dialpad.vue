<script setup lang="ts">
import {inject, ref} from "vue";
import Call from "@/view/Call"
import {useSipStore} from "@/store/app";
import {RTCSession, RTCSessionEventMap} from "jssip/lib/RTCSession";
import {UA} from "jssip";
import {CallOptions} from "jssip/lib/UA";

const sipStore = useSipStore();

const session = ref<RTCSession | null>(null);
const keyboard=[
    [
      {"number":"1","alpha":""},
      {"number":"2","alpha":"ABC"},
      {"number":"3","alpha":"DEF"},
    ],
  [
    {"number":"4","alpha":"GHI"},
    {"number":"5","alpha":"JKL"},
    {"number":"6","alpha":"MNO"},
  ],
  [
    {"number":"7","alpha":"PQRS"},
    {"number":"8","alpha":"TUV"},
    {"number":"9","alpha":"WXYZ"},
  ],
  [
    {"number":"*","alpha":""},
    {"number":"0","alpha":"+"},
    {"number":"#","alpha":""},
  ],
];

const emit=defineEmits(["closeDial"])
const closeDialpad=()=>{
    emit("closeDial");
};
const phoneNumber=ref("");
const clearLastDigit = () => {
  if (phoneNumber.value.length > 0) {
    phoneNumber.value = phoneNumber.value.slice(0, -1);
  }
};
const pressKey = (key:string) => {
  phoneNumber.value += key;
};
const makeCall=()=>{
  sipStore.makeCall(phoneNumber.value);
};
const dialog=ref(false);
</script>

<template>

  <div>
    <v-dialog
      v-model="dialog"

      :contained="true"

      :fullscreen="true"

      width="100%"

    >
      <v-card class="salign-content-space-between">
        <!--        <IncomingCall/>-->
        <Call/>
      </v-card>

    </v-dialog>
    <v-text-field
      class="pa-1"
      v-model="phoneNumber"
      label="Номер"
      append-inner-icon="mdi-backspace"
      @click:append-inner="clearLastDigit"
    />

    <v-btn-group v-for="itemRow in keyboard" :key="itemRow.join('')" class="pa-0 ma-1 w-100">
        <v-btn v-for="itemCol in itemRow"
               :key="itemCol.number"
               class="pa-0 ma-0 flex-grow-1 text-none"
               @click="pressKey(itemCol.number)"
        >

              {{itemCol.number}}<br>{{ itemCol.alpha }}

        </v-btn>
    </v-btn-group>
    <v-btn-group class="pa-0 ma-1 w-100 justify-space-around">
      <v-btn
          icon="mdi-message"
          @click="closeDialpad"
          class="pa-0 ma-0 rounded-circle bg-yellow-accent-4 text-white"
      />
      <v-btn
          icon="mdi-phone"
          @click="makeCall"
          class="pa-0 ma-0 rounded-circle bg-green"

      >

      </v-btn>
      <v-btn
          icon="mdi-contacts"
          @click="closeDialpad"
          class="pa-0 ma-0 rounded-circle"
      />
    </v-btn-group>

  </div>
</template>

<style scoped>

</style>
