<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Ласкаво просимо!
      </h1>
      <p class="text-gray-600 mb-8">
        Перейдіть на сторінку продуктів для роботи з додатком
      </p>
      <UButton 
        to="/products" 
        size="xl" 
        color="primary"
        class="text-lg"
      >
        Перейти до продуктів
      </UButton>
    </div>
  </div>
</template>
