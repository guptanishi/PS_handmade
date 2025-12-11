<template>
  <transition-group name="toast" tag="div" class="fixed top-4 right-4 z-50 space-y-3">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="flex items-start p-4 rounded-2xl shadow-2xl border-2 max-w-md backdrop-blur-md transform transition-all duration-300"
      :class="toastClasses(toast.type)"
    >
      <div class="flex-shrink-0 mr-3">
        <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="iconBgClass(toast.type)">
          <svg v-if="toast.type === 'success'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else-if="toast.type === 'error'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <svg v-else-if="toast.type === 'warning'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
      </div>
      
      <div class="flex-1 mr-2">
        <h4 class="font-bold text-sm mb-1">{{ toast.title }}</h4>
        <p class="text-sm opacity-90">{{ toast.message }}</p>
      </div>
      
      <button @click="removeToast(toast.id)" class="flex-shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </transition-group>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
import { computed } from 'vue'

const toastStore = useToastStore()
const toasts = computed(() => toastStore.toasts)

const removeToast = (id) => {
  toastStore.removeToast(id)
}

const toastClasses = (type) => {
  const classes = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }
  return classes[type] || classes.info
}

const iconBgClass = (type) => {
  const classes = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }
  return classes[type] || classes.info
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(400px);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(400px);
  opacity: 0;
}
</style>
