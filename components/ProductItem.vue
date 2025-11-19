<template>
  <li class="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
    <span class="text-gray-800 dark:text-white font-medium">{{ product.name }}</span>
    
    <UButton
      color="red"
      variant="ghost"
      icon="i-heroicons-trash-20-solid"
      @click="$emit('remove', product.id)"
      class="hover:bg-red-50 dark:hover:bg-red-900"
    >
      Видалити
    </UButton>
  </li>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

defineProps<{
  product: Product
}>()

defineEmits<{
  remove: [id: string]
}>()
</script>