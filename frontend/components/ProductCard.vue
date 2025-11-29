<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-100 dark:border-gray-700">
    <!-- Simple Product Info -->
    <div class="p-6">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ product.name }}
        </h3>
        <span class="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          ${{ parseFloat(product.price).toFixed(2) }}
        </span>
      </div>
      
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {{ formatDate(product.created_at) }}
      </p>

      <!-- Simple Buttons -->
      <div class="flex gap-2">
        <NuxtLink
          :to="`/products/${product.id}/edit`"
          class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-center font-medium py-2 px-4 rounded transition-colors duration-200"
        >
          Edit
        </NuxtLink>
        <button
          @click="$emit('delete', product.id)"
          class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['delete'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>