<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div class="mb-6 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full blur-2xl opacity-30 animate-pulse"></div>
      <div class="relative w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
        <span class="text-6xl">{{ icon }}</span>
      </div>
    </div>
    
    <h3 class="text-2xl font-bold text-gray-800 mb-3">{{ title }}</h3>
    <p class="text-gray-600 mb-6 max-w-md leading-relaxed">{{ message }}</p>
    
    <button
      v-if="actionText"
      @click="$emit('action')"
      class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
      {{ actionText }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '📭'
  },
  title: {
    type: String,
    default: 'No Data Found'
  },
  message: {
    type: String,
    default: 'Get started by adding your first item.'
  },
  actionText: {
    type: String,
    default: ''
  }
})

defineEmits(['action'])
</script>
