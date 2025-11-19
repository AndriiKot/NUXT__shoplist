export interface Product {
  id: string
  name: string
}

export const useProducts = () => {
  const products = ref<Product[]>([])

  const loadProducts = (): Product[] => {
    if (process.client) {
      const stored = localStorage.getItem('products')
      return stored ? JSON.parse(stored) : []
    }
    return []
  }

  const saveProducts = (items: Product[]) => {
    if (process.client) {
      localStorage.setItem('products', JSON.stringify(items))
    }
  }

  // Инициализация
  onMounted(() => {
    products.value = loadProducts()
  })

  const addProduct = (name: string) => {
    if (!name.trim()) return
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name: name.trim()
    }
    
    const updatedProducts = [...products.value, newProduct]
    products.value = updatedProducts
    saveProducts(updatedProducts)
  }

  const removeProduct = (id: string) => {
    const updatedProducts = products.value.filter(product => product.id !== id)
    products.value = updatedProducts
    saveProducts(updatedProducts)
  }

  const clearProducts = () => {
    products.value = []
    if (process.client) {
      localStorage.removeItem('products')
    }
  }

  return {
    products: readonly(products),
    addProduct,
    removeProduct,
    clearProducts
  }
}
