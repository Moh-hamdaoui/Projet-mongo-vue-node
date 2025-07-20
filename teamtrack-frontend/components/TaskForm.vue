<template>
  <form @submit.prevent="submit" class="bg-white p-4 rounded shadow-md">
    <input v-model="title" type="text" placeholder="Titre" class="input mb-2" required />
    <textarea v-model="description" placeholder="Description" class="input mb-2" required></textarea>
    <select v-model="status" class="input mb-2">
      <option>à faire</option>
      <option>en cours</option>
      <option>terminé</option>
    </select>
       <select v-model="assignedTo" class="input mb-4">
      <option disabled value="">Assigner à un utilisateur</option>
      <option v-for="user in users" :key="user._id" :value="user._id">
        {{ user.name || user.email }}
      </option>
    </select>
    <button class="btn w-full">Ajouter la tâche</button>
  </form>
</template>

<script setup>
const emit = defineEmits(['created'])

const title = ref('')
const description = ref('')
const status = ref('à faire')
const assignedTo = ref('')
const users = ref([]) 

const route = useRoute()
const projectId = route.query.id
const { $api } = useNuxtApp()

onMounted(async () => {
  const res = await $api('/users') 
  users.value = res
})

const submit = async () => {
  await $api('/tasks', {
    method: 'POST',
    body: {
      title: title.value,
      description: description.value,
      status: status.value,
      project: projectId,
      assignedTo: assignedTo.value || null,
    }
  })

  title.value = ''
  description.value = ''
  status.value = 'à faire'
  assignedTo.value = ''
  emit('created')
}
</script>
