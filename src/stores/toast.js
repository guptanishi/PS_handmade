import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])
  let nextId = 1

  const addToast = ({ title, message, type = 'info', duration = 4000 }) => {
    const id = nextId++
    const toast = { id, title, message, type }
    
    toasts.value.push(toast)
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
    
    return id
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (message, title = 'Success') => {
    return addToast({ title, message, type: 'success' })
  }

  const error = (message, title = 'Error') => {
    return addToast({ title, message, type: 'error', duration: 5000 })
  }

  const warning = (message, title = 'Warning') => {
    return addToast({ title, message, type: 'warning' })
  }

  const info = (message, title = 'Info') => {
    return addToast({ title, message, type: 'info' })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  }
})
