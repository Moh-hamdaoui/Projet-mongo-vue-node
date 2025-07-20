<template>
  <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-200 space-y-3">
    <h3 class="text-2xl font-semibold text-gray-800">{{ project.title }}</h3>
    <p class="text-gray-600">{{ project.description }}</p>

    <div v-if="project.collaborators?.length" class="mt-4">
      <p class="text-sm font-medium text-gray-500 mb-1">Collaborateurs :</p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="user in project.collaborators"
          :key="user._id"
          class="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
        >
          {{ user.name || user.email }}
        </span>
      </div>
    </div>

    <div v-if="project.owner" class="mt-3">
      <p class="text-xs text-gray-400">
        Créé par : 
        <span class="font-medium text-gray-700">
          {{ project.owner.name || project.owner.email }}
        </span>
      </p>
    </div>

    <div class="flex items-center justify-between mt-4">
      <NuxtLink
        :to="`/project?id=${project._id}`"
        class="text-sm text-blue-600 font-semibold hover:underline"
      >
        Voir projet →
      </NuxtLink>

      <button
        @click="handleDelete"
        class="text-sm text-red-500 font-medium hover:underline"
      >
        Supprimer
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ project: Object })
const emit = defineEmits(['deleted'])

const { $api } = useNuxtApp()

const handleDelete = async () => {
  if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
    await $api(`/projects/${props.project._id}`, { method: 'DELETE' })
    emit('deleted', props.project._id)
  }
}
</script>
