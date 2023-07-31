<template>
  <v-card>
    <v-toolbar color="primary">

      <v-toolbar-title>{{ tab }}</v-toolbar-title>

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
  </v-card>
</template>

<script setup lang="ts">
import {defineAsyncComponent, ref} from "vue";

const tab = ref(null);

const items = [
  { name: "Контакты", icon: "mdi-contacts", component: defineAsyncComponent(() => import("../view/Contacts.vue")) },
  { name: "История", icon: "mdi-history", component: defineAsyncComponent(() => import("../view/History.vue")) },
  { name: "Сообщения", icon: "mdi-message", component: defineAsyncComponent(() => import("../view/Messages.vue")) },
  { name: "Настройки", icon: "mdi-cog", component: defineAsyncComponent(() => import("../view/Settings.vue")) }
];
</script>
