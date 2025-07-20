<template>
  <form @submit.prevent="submit" class="bg-white p-4 rounded shadow-md mb-4">
    <input v-model="title" placeholder="Titre du projet" class="input mb-2" required />
    <textarea v-model="description" placeholder="Description" class="input mb-2" />

  <label class="block mb-1 font-medium">Collaborateurs</label>
    <select v-model="collaborators" multiple class="input mb-2">
      <option v-for="user in users" :key="user._id" :value="user._id">
        {{ user.name }}
      </option>
    </select>


    <button class="btn w-full">Créer le projet</button>
  </form>
</template>


<script setup>
const title = ref('')
const description = ref('')
const collaborators = ref([])
const users = ref([])

const { $api } = useNuxtApp()
const emit = defineEmits(['created'])

onMounted(async () => {
  const res = await $api('/users') 
  users.value = res
})

const submit = async () => {
  await $api('/projects', {
    method: 'POST',
    body: {
      title: title.value,
      description: description.value,
      collaborators: collaborators.value
    }
  })

  title.value = ''
  description.value = ''
  collaborators.value = []
  emit('created')
}
</script>

