<script lang="ts" setup>
import {ref} from "vue";
import {useSipStore} from "@/store/app";
const sipStore = useSipStore();
const phoneNumber = ref("0-000-000000")
</script>

<template>
  <h1 class="text-primary d-flex w-100 justify-center ">{{ phoneNumber }}</h1>
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
    <v-btn-group class="pa-0 ma-15 w-100 h-auto justify-space-between">
      <v-btn
        icon="mdi-phone"
          size="60"
        class="pa-0 ma-0 rounded-circle bg-green "
        @click="sipStore.answer"
      >

      </v-btn>
      <v-btn
        icon="mdi-phone-hangup"
        size="60"
        class="pa-0 ma-0 rounded-circle bg-red "
        @click="sipStore.hangupCall"
      >

      </v-btn>
    </v-btn-group>
  </div>
</template>

<style scoped>

</style>
