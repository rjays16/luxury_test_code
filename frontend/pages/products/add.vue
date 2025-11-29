<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Add New Product
      </h1>

      <ProductForm
        :loading="loading"
        submit-label="Create Product"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup>
const { createProduct } = useProducts()
const { showToast } = useToast()
const router = useRouter()

const loading = ref(false)

const handleSubmit = async (data) => {
  try {
    loading.value = true
    await createProduct(data)
    showToast('Product created successfully!', 'success')
    router.push('/')
  } catch (err) {
    showToast('Failed to create product', 'error')
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>
