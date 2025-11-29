<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Edit Product
      </h1>

      <LoadingSpinner v-if="loadingProduct" />

      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
          Error
        </h3>
        <p class="text-red-600 dark:text-red-400 mb-4">
          {{ error }}
        </p>
        <NuxtLink
          to="/"
          class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Back to Products
        </NuxtLink>
      </div>

      <ProductForm
        v-else
        :initial-data="product"
        :loading="saving"
        submit-label="Update Product"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { getProduct, updateProduct } = useProducts()
const { showToast } = useToast()

const product = ref({})
const loadingProduct = ref(true)
const saving = ref(false)
const error = ref(null)

const loadProduct = async () => {
  try {
    loadingProduct.value = true
    error.value = null
    product.value = await getProduct(route.params.id)
  } catch (err) {
    error.value = 'Product not found'
    console.error(err)
  } finally {
    loadingProduct.value = false
  }
}

const handleSubmit = async (data) => {
  try {
    saving.value = true
    await updateProduct(route.params.id, data)
    showToast('Product updated successfully!', 'success')
    router.push('/')
  } catch (err) {
    showToast('Failed to update product', 'error')
    console.error(err)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadProduct()
})
</script>
