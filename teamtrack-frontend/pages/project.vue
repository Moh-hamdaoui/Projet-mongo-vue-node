<script setup>
const route = useRoute()
const projectId = route.query.id
const { $api } = useNuxtApp()

const { data: tasks, refresh } = await useAsyncData(() =>
  $api(`/tasks/project/${projectId}`)
)

const deleteTask = async (taskId) => {
  await $api(`/tasks/${taskId}`, { method: 'DELETE' })
  refresh()
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Tâches du projet</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <TaskCard
        v-for="task in tasks"
        :key="task._id"
        :task="task"
        @delete="deleteTask"
      />
    </div>

    <h2 class="text-xl font-semibold mb-2">Ajouter une tâche</h2>
    <TaskForm @created="refresh" />
  </div>
</template>
