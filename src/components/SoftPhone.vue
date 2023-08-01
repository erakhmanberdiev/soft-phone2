<template>
  <v-card>
    <v-toolbar color="primary">

      <v-toolbar-title>{{ tab }} </v-toolbar-title>

      <v-spacer></v-spacer>


      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <template v-slot:extension >
        <v-row justify="center">
          <v-tabs v-model="tab" align-tabs="center">
            <v-tab
              v-for="item in items"
              :key="item.name"
              :value="item.name"
            >
              <v-icon :icon="item.icon" />
            </v-tab>
          </v-tabs>
        </v-row>
      </template>
    </v-toolbar>

    <v-window v-model="tab">
      <v-window-item
        v-for="item in items"
        :key="item.name"
        :value="item.name"
        class="h-100"
      >
        <v-card app height="400px">
          <component :is="item.component"/>

        </v-card>
      </v-window-item>
    </v-window>
    <v-dialog
      v-model="isIncommingCall"
      :contained="true"
      :fullscreen="true"
      width="100%"
    >
      <v-card class="salign-content-space-between">
        <IncomingCall/>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="isCalling"
      :contained="true"
      :fullscreen="true"
      width="100%"
    >
      <v-card class="salign-content-space-between">
        <Call/>
      </v-card>
    </v-dialog>
    <audio id="audioPlayer" preload="auto" controls></audio>
  </v-card>
</template>

<script setup lang="ts">
import {defineAsyncComponent, ref} from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Call from "@/view/Call.vue";
import IncomingCall from "@/view/IncomingCall"
import {useSipStore} from "@/store/app";
import {storeToRefs} from "pinia";
const sipStore=useSipStore()
const tab = ref(null);
const dialog = ref(false);
const {isIncommingCall,isCalling}=storeToRefs(sipStore);

const items = [
  { name: "Контакты", icon: "mdi-contacts", component: defineAsyncComponent(() => import("../view/Contacts.vue")) },
  { name: "История", icon: "mdi-history", component: defineAsyncComponent(() => import("../view/History.vue")) },
  { name: "Сообщения", icon: "mdi-message", component: defineAsyncComponent(() => import("../view/Messages.vue")) },
  { name: "Настройки", icon: "mdi-cog", component: defineAsyncComponent(() => import("../view/Settings.vue")) }
];
</script>
