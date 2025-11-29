<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Simple Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-3">
            <div class="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">
              Product Catalog
            </span>
          </NuxtLink>

          <!-- Navigation -->
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/"
              class="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
            >
              Products
            </NuxtLink>
            <NuxtLink
              to="/products/add"
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
            >
              + Add Product
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Toast -->
    <Toast />
  </div>
</template>