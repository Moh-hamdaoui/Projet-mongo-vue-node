<script setup>

const { $api } = useNuxtApp()
const showForm = ref(false)

const { data: projects, refresh } = await useAsyncData(() => $api('/projects'))

const handleProjectCreated = () => {
  showForm.value = false
  refresh()
}

const onProjectDeleted = async () => {
  await refresh()
}

</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <button @click="showForm = !showForm" class="btn mb-4">
      {{ showForm ? 'Fermer le formulaire' : 'Ajouter un projet' }}
    </button>

    <ProjectForm v-if="showForm" @created="handleProjectCreated" />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <ProjectCard
  v-for="project in projects"
  :key="project._id"
  :project="project"
  @deleted="onProjectDeleted"
/>

    </div>
  </div>
</template>
