<script setup lang="ts">

import {computed, ref} from "vue";

const serverUrl = ref(localStorage.getItem('serverUrl') || '');
const username = ref(localStorage.getItem('username') || '');
const password = ref(localStorage.getItem('password') || '');
// eslint-disable-next-line vue/return-in-computed-property
const regStatus = computed((e) => {
  try{
    // console.log(sipStore.getRegStatus)
    // return sipStore.getRegStatus
  }catch(e){
    return "error"
  }

});
const submitForm = () => {
  localStorage.setItem('serverUrl', serverUrl.value);
  localStorage.setItem('username', username.value);
  localStorage.setItem('password', password.value);

  // sipStore?.registration(serverUrl.value, username.value, password.value);

};
</script>

<template>
  <div class="pa-2">
    <h2 class="py-2">Регистрация SIP</h2>
    <v-divider :thickness="2" class="border-opacity-100 py-2" :color=regStatus></v-divider>
    {{regStatus}}
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="serverUrl" label="URL сервера SIP"></v-text-field>
      <v-text-field v-model="username" label="Имя пользователя"></v-text-field>
      <v-text-field v-model="password" label="Пароль" type="password"></v-text-field>
      <v-btn type="submit">Зарегистрироваться</v-btn>
    </v-form>
  </div>
</template>

<style scoped>

</style>
