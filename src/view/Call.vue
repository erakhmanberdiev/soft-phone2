<script lang="ts" setup>
import {ref} from "vue";
import {useSipStore} from "@/store/app";

const sipStore = useSipStore();
const phoneNumber = ref("0-000-000000");
const hangupCall = () => {
  console.log("HangUp calling!!!!!!!!!")
  sipStore.hangupCall();
}
const buttons = [
  [{
    "icon": "mdi-volume-high",
    "name": "pause",
    "function": () => {
    },
  },
    {
      "icon": "mdi-microphone",
      "name": "mute",
      "function": () => {
      },
    },
    {
      "icon": "mdi-pause",
      "name": "pause",
      "function": () => {
      },
    },
  ],


]
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
             @click="itemCol.function"

      >
        <div class="justify-center">
          <v-icon
            :icon="itemCol.icon"
            :size="25"
            class="text-primary"
          />
          <br>
          <div class="text-primary">{{ itemCol.name }}</div>
        </div>


        <!--        {{itemCol.pause}}<br>{{ itemCol.icon }}-->

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
