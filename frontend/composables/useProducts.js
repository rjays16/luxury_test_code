export const useProducts = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const getProducts = async () => {
    try {
      const response = await $fetch(`${apiBase}/api/products`)
      return response.data
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  const getProduct = async (id) => {
    try {
      const response = await $fetch(`${apiBase}/api/products/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    }
  }

  const createProduct = async (data) => {
    try {
      const response = await $fetch(`${apiBase}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return response
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  const updateProduct = async (id, data) => {
    try {
      const response = await $fetch(`${apiBase}/api/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return response
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await $fetch(`${apiBase}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json'
        }
      })
      return response
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }

  return {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
  }
}
