<script setup>
const email = ref('')
const password = ref('')
const { login } = useAuth()
const router = useRouter()

const submit = async () => {
  const { success, error } = await login(email.value, password.value)

  if (success) {
    router.push('/dashboard')
  } else {
    console.error('Erreur lors de la connexion :', error)
    alert(error)
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <form @submit.prevent="submit" class="w-96 bg-white p-6 rounded shadow">
      <h2 class="text-xl mb-4">Connexion</h2>
      <input v-model="email" type="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Mot de passe" class="input mt-2" />
      <button type="submit" class="btn mt-4 w-full">Se connecter</button>
    </form>
  </div>
</template>
