export interface Product {
  id: string
  name: string
}

export const useProducts = () => {
  const products = ref<Product[]>([])
  const { init, send } = useSync('products-sync')

  init((event) => {
    const { type, data } = event.data
    
    switch (type) {
      case 'PRODUCTS_UPDATED':
        products.value = data
        break
      case 'PRODUCT_ADDED':
        if (!products.value.find(p => p.id === data.id)) {
          products.value.push(data)
        }
        break
      case 'PRODUCT_REMOVED':
        products.value = products.value.filter(p => p.id !== data.id)
        break
    }
  })
  
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
    send('PRODUCT_ADDED', newProduct)
  }

  const removeProduct = (id: string) => {
    const productToRemove = products.value.find(product => product.id === id)
    const updatedProducts = products.value.filter(product => product.id !== id)
    products.value = updatedProducts
    saveProducts(updatedProducts)
    send('PRODUCT_REMOVED', { id })
  }

  const clearProducts = () => {
    products.value = []
    if (process.client) {
      localStorage.removeItem('products')
    }
    send('PRODUCTS_UPDATED', [])
  }

  return {
    products: readonly(products),
    addProduct,
    removeProduct,
    clearProducts
  }
}

export const useSync = (channelName: string) => {
  const channel = ref<BroadcastChannel | null>(null)
  
  const init = (onMessage: (event: MessageEvent) => void) => {
    if (process.client) {
      channel.value = new BroadcastChannel(channelName)
      channel.value.onmessage = onMessage
    }
  }
  
  const send = (type: string, data?: any) => {
    if (channel.value) {
      channel.value.postMessage({ type, data })
    }
  }
  
  const close = () => {
    if (channel.value) {
      channel.value.close()
    }
  }
  
  onUnmounted(() => {
    close()
  })
  
  return {
    init,
    send,
    close
  }
}