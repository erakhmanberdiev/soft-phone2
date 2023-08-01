<script lang="ts" setup>

import {Ref, ref, UnwrapRef} from "vue";
import {useSipStore} from "@/store/app";

interface ButtonIc {
  icons: string[]; // Массив из двух строк, представляющих две иконки
  name: string; // Название кнопки
  function: () => void; // Функция, которая будет выполняться при нажатии на кнопку
  activeIconIndex: Ref<number>; // Индекс активной иконки (0 или 1)
}

const sipStore = useSipStore();
const phoneNumber = ref("0-000-000000");
const isMute=ref(false)
const isHold=ref(false);
const mute=()=>{
  console.log("Mute!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      if(!isMute.value){
        sipStore.mute();
      }else{
        sipStore.unmute();
      }
      isMute.value=!isMute.value;
};
const hold=()=>{
  console.log("Hold!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  if(!isHold.value){
    sipStore.hold();
  }else{
    sipStore.unhold();
  }
  isHold.value=!isHold.value;
};
const hangupCall = () => {
  console.log("HangUp calling!!!!!!!!!")
  sipStore.hangupCall();
}
const toggleIcon = (button: ButtonIc) => {
  console.log(button.icons)
  button.activeIconIndex.value = (button.activeIconIndex.value + 1) % button.icons.length;
  button.function();
};
const buttons: ButtonIc[3][] = [
  // Button 1
  [
    {
      icons: ["mdi-volume-high", "mdi-head-phones"],
      name: "speaker",
      activeIconIndex: ref(0),
      function: () => {},
    },
    {
      icons: ["mdi-microphone", "mdi-microphone-off"],
      name: "mute",
      activeIconIndex: ref(0),
      function:mute,
    },
    {
      icons: ["mdi-pause", "mdi-play"],
      name: "hold",
      activeIconIndex: ref(0),
      function: hold,
    },
  ],
  // Add more button groups if needed...
];
</script>

<template>
  <div class="d-flex align-center justify-center flex-row flex-wrap h-100 w-100 align-content-space-between">
    <div class="bg-primary" style="border-radius: 50%; padding: 5px; display: inline-block;">
      <div style="background-color: white; border-radius: 50%; padding: 10px;">
        <v-icon
          icon="mdi-account"
          :size="100"
          class="text-primary"
        />
      </div>

    </div>

    <h1 class="text-primary d-flex w-100 justify-center ">{{ phoneNumber }}</h1>
    <v-btn-group v-for="itemRow in buttons" :key="itemRow.join('')" class="pa-1 ma-1 w-100">
      <v-btn v-for="itemCol in itemRow"
             :key="itemCol.number"
             class="pa-0 ma-0 flex-grow-1 text-none"
             @click="toggleIcon(itemCol)"

      >
        <div class="justify-center">
          <v-icon
            :icon="itemCol.icons[itemCol.activeIconIndex.value]"
            :size="25"
            class="text-primary"
          />
          <br>
          <div class="text-primary">{{ itemCol.name }}</div>
        </div>
      </v-btn>
    </v-btn-group>
    <v-divider/>
    <v-btn-group class="pa-0 ma-1 w-100 justify-space-around ">
      <v-btn
        icon="mdi-phone-hangup"
        size="60"
        class="pa-0 ma-0 rounded-circle bg-red "
        @click="hangupCall"
      >

      </v-btn>
    </v-btn-group>


  </div>
</template>

<style scoped>

</style>
