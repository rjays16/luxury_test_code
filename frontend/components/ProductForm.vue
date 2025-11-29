<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Product Name
      </label>
      <input
        id="name"
        v-model="formData.name"
        type="text"
        required
        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        placeholder="Enter product name"
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-600">
        {{ errors.name }}
      </p>
    </div>

    <div>
      <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Price
      </label>
      <div class="relative">
        <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">$</span>
        <input
          id="price"
          v-model="formData.price"
          type="number"
          step="0.01"
          min="0.01"
          required
          class="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="0.00"
        />
      </div>
      <p v-if="errors.price" class="mt-1 text-sm text-red-600">
        {{ errors.price }}
      </p>
    </div>

    <div class="flex gap-4">
      <button
        type="submit"
        :disabled="loading"
        class="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
      >
        <span v-if="loading">Saving...</span>
        <span v-else>{{ submitLabel }}</span>
      </button>
      <NuxtLink
        to="/"
        class="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-center"
      >
        Cancel
      </NuxtLink>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({ name: '', price: '' })
  },
  submitLabel: {
    type: String,
    default: 'Save'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const formData = ref({
  name: props.initialData.name || '',
  price: props.initialData.price || ''
})

const errors = ref({
  name: '',
  price: ''
})

const validateForm = () => {
  errors.value = { name: '', price: '' }
  let isValid = true

  if (!formData.value.name.trim()) {
    errors.value.name = 'Product name is required'
    isValid = false
  }

  if (!formData.value.price || formData.value.price <= 0) {
    errors.value.price = 'Price must be greater than 0'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', {
      name: formData.value.name,
      price: parseFloat(formData.value.price)
    })
  }
}

watch(() => props.initialData, (newData) => {
  formData.value = {
    name: newData.name || '',
    price: newData.price || ''
  }
}, { deep: true })
</script>
