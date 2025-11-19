<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 p-8 transition-colors">
    <div class="max-w-md mx-auto space-y-4">
      <button 
        @click="toggleTheme"
        class="w-full p-3 bg-blue-500 text-white rounded-lg font-medium"
      >
        {{ isDark ? 'Темная тема 🌙' : 'Светлая тема ☀️' }}
      </button>

      <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p class="text-gray-800 dark:text-white">Этот текст меняет цвет</p>
      </div>

      <div class="p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
        <p class="text-gray-600 dark:text-gray-300">Вторичный текст</p>
      </div>

      <div class="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
        <p class="text-green-800 dark:text-green-200 text-center font-bold">
          {{ isDark ? 'ТЕМНАЯ ТЕМА АКТИВНА ✅' : 'СВЕТЛАЯ ТЕМА' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>