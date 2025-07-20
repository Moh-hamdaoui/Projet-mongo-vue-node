<template>
  <div class="bg-gray-50 border p-4 rounded-lg shadow-sm relative">
    <div class="flex justify-between items-center mb-2">
      <h4 class="font-semibold text-lg">{{ task.title }}</h4>
      <span
        class="text-sm px-2 py-1 rounded"
        :class="{
          'bg-yellow-100 text-yellow-800': task.status === 'à faire',
          'bg-blue-100 text-blue-800': task.status === 'en cours',
          'bg-green-100 text-green-800': task.status === 'terminé',
        }"
      >
        {{ task.status }}
      </span>
    </div>

    <p class="text-sm text-gray-600">{{ task.description }}</p>
    <p class="text-xs text-gray-500 mt-2">Assignée à : {{ task.assignedTo?.name || 'Non assignée' }}</p>

    <div class="flex justify-end gap-2 mt-4 text-sm">
      <button class="text-red-500 hover:underline" @click="$emit('delete', task._id)">Supprimer</button>
    </div>
  </div>
</template>

<script setup>
defineProps({ task: Object })
defineEmits(['delete'])
</script>
