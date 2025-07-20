<template>
  <div class="max-w-md mx-auto mt-10">
    <h2 class="text-2xl font-bold mb-4">Inscription</h2>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Nom" class="input mb-2" required />
      <input v-model="email" type="email" placeholder="Email" class="input mb-2" required />
      <input v-model="password" type="password" placeholder="Mot de passe" class="input mb-2" required />
      <button class="btn w-full">S'inscrire</button>
    </form>
  </div>
</template>

<script setup>
const name = ref('')
const email = ref('')
const password = ref('')

const { $api } = useNuxtApp()
const router = useRouter()

const register = async () => {
  try {
    const res = await $api('/auth/register', {
      method: 'POST',
      body: { name: name.value, email: email.value, password: password.value },
    })
    useCookie('token').value = res.token
    router.push('/dashboard')
  } catch (err) {
    alert('Erreur inscription')
  }
}
</script>
