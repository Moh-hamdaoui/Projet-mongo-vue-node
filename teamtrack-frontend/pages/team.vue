<script setup>
const route = useRoute()
const { $api } = useNuxtApp()
const projectId = route.query.projectId
const { data: team } = await useAsyncData(() => $api(`/projects/${projectId}/team`))
</script>

<template>
  <h2 class="text-xl font-bold mb-4">Équipe</h2>
  <ul>
    <li v-for="member in team" :key="member._id">{{ member.name }}</li>
  </ul>
</template>
