<script setup lang="ts">
import { useRouter } from 'vue-router'

const { go } = useRouter()

function goToPath() {
  go(-1)
}
</script>
<template>
  <q-btn @click="goToPath" class="fixed bg-white q-ma-sm" round style="z-index:99;opacity:0.7;left:0;top:0;">
    <q-icon size="2em" name="chevron_left"></q-icon></q-btn>
</template>
