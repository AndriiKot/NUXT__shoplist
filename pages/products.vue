<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <UContainer>
      <div class="text-right mb-4">
        <UButton
          :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          @click="toggleTheme"
          color="gray"
          variant="ghost"
        />
      </div>
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Список продуктів
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          Додавайте та видаляйте продукти. Дані зберігаються в localStorage.
        </p>
      </div>

      <UCard class="mb-6">
        <template #header>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Додати новий продукт
          </h2>
        </template>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <UFormGroup label="Назва продукту" name="name">
            <UInput
              v-model="newProductName"
              placeholder="Введіть назву продукту..."
              size="lg"
              :disabled="isSubmitting"
            />
          </UFormGroup>

          <UButton
            type="submit"
            color="primary"
            size="lg"
            :loading="isSubmitting"
            :disabled="!newProductName.trim()"
            class="w-full"
          >
            <template #leading>
              <UIcon name="i-heroicons-plus-20-solid" />
            </template>
            Додати продукт
          </UButton>
        </form>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Список продуктів ({{ products.length }})
            </h2>
            
            <UButton
              v-if="products.length > 0"
              color="gray"
              variant="ghost"
              @click="clearAllProducts"
              :disabled="isClearing"
            >
              Очистити все
            </UButton>
          </div>
        </template>

        <div v-if="products.length === 0" class="text-center py-12">
          <UIcon name="i-heroicons-clipboard-document-list-20-solid" class="text-gray-300 dark:text-gray-600 text-6xl mb-4" />
          <p class="text-gray-500 dark:text-gray-400 text-lg">Список продуктів порожній</p>
          <p class="text-gray-400 dark:text-gray-500">Додайте перший продукт вище</p>
        </div>

        <ul v-else class="divide-y divide-gray-200 dark:divide-gray-700">
          <ProductItem
            v-for="product in products"
            :key="product.id"
            :product="product"
            @remove="removeProduct"
          />
        </ul>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')
const toggleTheme = () => { colorMode.preference = isDark.value ? 'light' : 'dark' }

const { 
  products, 
  addProduct, 
  removeProduct, 
  clearProducts 
} = useProducts()

const newProductName = ref('')
const isSubmitting = ref(false)
const isClearing = ref(false)

const handleSubmit = async () => {
  if (!newProductName.value.trim()) return
  
  isSubmitting.value = true
  
  try {
    addProduct(newProductName.value)
    newProductName.value = ''
    
    await new Promise(resolve => setTimeout(resolve, 300))
  } finally {
    isSubmitting.value = false
  }
}

const clearAllProducts = async () => {
  isClearing.value = true
  
  try {
    if (confirm('Ви впевнені, що хочете видалити всі продукти?')) {
      clearProducts()
    }
  } finally {
    isClearing.value = false
  }
}
</script>