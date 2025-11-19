<!-- pages/products.vue -->
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <UContainer>
      <!-- Заголовок -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Список продуктів
        </h1>
        <p class="text-gray-600">
          Додавайте та видаляйте продукти. Дані зберігаються в localStorage.
        </p>
      </div>

      <!-- Форма додавання -->
      <UCard class="mb-6">
        <template #header>
          <h2 class="text-xl font-semibold text-gray-900">
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

      <!-- Список продуктів -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">
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

        <!-- Пустой список -->
        <div v-if="products.length === 0" class="text-center py-12">
          <UIcon name="i-heroicons-clipboard-document-list-20-solid" class="text-gray-300 text-6xl mb-4" />
          <p class="text-gray-500 text-lg">Список продуктів порожній</p>
          <p class="text-gray-400">Додайте перший продукт вище</p>
        </div>

        <!-- Список с продуктами -->
        <ul v-else class="divide-y divide-gray-200">
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
const { 
  products, 
  addProduct, 
  removeProduct, 
  clearProducts 
} = useProducts()

const newProductName = ref('')
const isSubmitting = ref(false)
const isClearing = ref(false)

// Добавление продукта
const handleSubmit = async () => {
  if (!newProductName.value.trim()) return
  
  isSubmitting.value = true
  
  try {
    addProduct(newProductName.value)
    newProductName.value = ''
    
    // Небольшая задержка для лучшего UX
    await new Promise(resolve => setTimeout(resolve, 300))
  } finally {
    isSubmitting.value = false
  }
}

// Очистка всех продуктов
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
