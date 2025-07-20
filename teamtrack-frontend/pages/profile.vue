<script setup>
const email = ref('')
const password = ref('')
const { $api } = useNuxtApp()

const save = async () => {
  await $api('/auth/profile', { method: 'PUT', body: { email: email.value, password: password.value } })
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">Mon profil</h2>
    <input v-model="email" placeholder="Nouvel email" class="input mb-2" />
    <input v-model="password" type="password" placeholder="Nouveau mot de passe" class="input mb-2" />
    <button class="btn" @click="save">Enregistrer</button>
  </div>
</template>
