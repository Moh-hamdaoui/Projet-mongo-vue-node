<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4 text-gray-800">Bienvenue sur <span class="text-blue-500">TeamTrack</span> 👥</h1>
      <p class="text-lg text-gray-600 mb-6">Gérez vos projets et vos tâches en équipe, simplement.</p>
      <div class="flex justify-center gap-4">
        <NuxtLink to="/login" class="btn">Connexion</NuxtLink>
        <NuxtLink to="/register" class="btn btn-secondary">Inscription</NuxtLink>
      </div>
    </div>
  </div>
</template>
