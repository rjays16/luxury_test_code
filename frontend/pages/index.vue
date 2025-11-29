<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Simple Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Products</h1>
      <p class="text-gray-600 dark:text-gray-400">Manage your product catalog</p>
    </div>

    <!-- Loading -->
    <LoadingSpinner v-if="loading" />

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
      <h3 class="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
        Error Loading Products
      </h3>
      <p class="text-red-600 dark:text-red-400 mb-4">
        {{ error }}
      </p>
      <button
        @click="loadProducts"
        class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition-colors duration-200"
      >
        Try Again
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="products.length === 0" class="text-center py-16">
      <div class="text-gray-400 dark:text-gray-600 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        No Products Yet
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mb-6">
        Get started by creating your first product
      </p>
      <NuxtLink
        to="/products/add"
        class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded transition-colors duration-200"
      >
        Add Product
      </NuxtLink>
    </div>

    <!-- Products Grid -->
    <div v-else>
      <div class="flex items-center justify-between mb-6">
        <p class="text-gray-600 dark:text-gray-400">{{ products.length }} products</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @delete="confirmDelete"
        />
      </div>
    </div>

    <!-- Delete Modal -->
    <Teleport to="body">
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="showDeleteModal = false"
      >
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Delete Product?
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            Are you sure? This action cannot be undone.
          </p>
          <div class="flex gap-3">
            <button
              @click="handleDelete"
              :disabled="deleting"
              class="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
            >
              {{ deleting ? 'Deleting...' : 'Delete' }}
            </button>
            <button
              @click="showDeleteModal = false"
              :disabled="deleting"
              class="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
const { getProducts, deleteProduct } = useProducts()
const { showToast } = useToast()

const products = ref([])
const loading = ref(true)
const error = ref(null)
const showDeleteModal = ref(false)
const productToDelete = ref(null)
const deleting = ref(false)

const loadProducts = async () => {
  try {
    loading.value = true
    error.value = null
    products.value = await getProducts()
  } catch (err) {
    error.value = 'Failed to load products. Please make sure the API is running.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const confirmDelete = (id) => {
  productToDelete.value = id
  showDeleteModal.value = true
}

const handleDelete = async () => {
  try {
    deleting.value = true
    await deleteProduct(productToDelete.value)
    products.value = products.value.filter(p => p.id !== productToDelete.value)
    showDeleteModal.value = false
    showToast('Product deleted successfully', 'success')
  } catch (err) {
    showToast('Failed to delete product', 'error')
    console.error(err)
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  loadProducts()
})
</script>