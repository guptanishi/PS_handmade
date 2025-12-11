<template>
  <transition name="modal">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="close">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      <div class="relative bg-white rounded-3xl shadow-2xl max-w-md w-full transform transition-all animate-fadeIn border-2 border-gray-200">
        <!-- Header -->
        <div class="p-6 border-b-2 border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="iconBgClass">
              <svg v-if="type === 'danger'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <svg v-else-if="type === 'warning'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800">{{ title }}</h3>
          </div>
        </div>
        
        <!-- Body -->
        <div class="p-6">
          <p class="text-gray-600 leading-relaxed">{{ message }}</p>
        </div>
        
        <!-- Footer -->
        <div class="p-6 border-t-2 border-gray-100 flex justify-end space-x-3">
          <button
            @click="close"
            class="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold text-gray-700 shadow-md hover:shadow-lg"
          >
            {{ cancelText }}
          </button>
          <button
            @click="confirm"
            class="px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-white"
            :class="confirmButtonClass"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?'
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'warning', 'danger'].includes(value)
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const close = () => {
  emit('update:modelValue', false)
  emit('cancel')
}

const confirm = () => {
  emit('update:modelValue', false)
  emit('confirm')
}

const iconBgClass = computed(() => {
  const classes = {
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  }
  return classes[props.type]
})

const confirmButtonClass = computed(() => {
  const classes = {
    info: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
    warning: 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
  }
  return classes[props.type]
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.9);
}
</style>
