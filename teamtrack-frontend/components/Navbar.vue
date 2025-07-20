<template>
  <nav class="bg-white border-b px-6 py-3 flex justify-between items-center shadow-sm">
    <NuxtLink to="/dashboard" class="text-xl font-bold">TeamTrack</NuxtLink>
    <div class="flex gap-4 items-center">
      <NuxtLink to="/profile" class="text-gray-600 hover:text-black">Profil</NuxtLink>
      <button @click="logout" class="text-red-500 hover:text-red-700">Déconnexion</button>
    </div>
  </nav>
</template>

<script setup>
const { logout } = useAuth()
const router = useRouter()
const logoutUser = () => {
  logout()
  router.push('/login')
}
</script>
