<script setup lang="ts">
import {ref} from "vue";
import Dialpad from "@/view/Dialpad.vue";

const dialpadVisible=ref(false);
const openDialpad=()=>{
  dialpadVisible.value=!dialpadVisible.value;
};

</script>

<template>
  <div v-if="dialpadVisible" class="position-absolute h-100 w-100">
    <Dialpad @closeDial="openDialpad" />
  </div>
  <div v-else>
    <h1>Contacts</h1>

    <v-btn
        class="float-button"
        icon="mdi-dialpad"
        @click="openDialpad"
    />
  </div>
</template>

<style scoped>
.float-button{
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 16px 16px;

}
</style>
