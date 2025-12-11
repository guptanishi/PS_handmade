<template>
  <div class="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-md">
    <div class="flex items-center space-x-4">
      <span class="text-sm text-gray-600">
        Showing {{ startItem }} to {{ endItem }} of {{ total }} {{ itemName }}
      </span>
      
      <div class="flex items-center space-x-2">
        <label for="perPage" class="text-sm text-gray-600">Per page:</label>
        <select
          id="perPage"
          v-model="perPageModel"
          class="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white cursor-pointer"
        >
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>
    </div>
    
    <div class="flex items-center space-x-2">
      <button
        @click="goToPage(1)"
        :disabled="currentPage === 1"
        class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        title="First page"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
        </svg>
      </button>
      
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        title="Previous page"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <div class="flex items-center space-x-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          class="min-w-[40px] h-10 rounded-lg font-semibold transition-all"
          :class="page === currentPage 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
            : 'hover:bg-gray-100 text-gray-700'"
        >
          {{ page }}
        </button>
      </div>
      
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        title="Next page"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      
      <button
        @click="goToPage(totalPages)"
        :disabled="currentPage === totalPages"
        class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        title="Last page"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  itemName: {
    type: String,
    default: 'items'
  }
})

const emit = defineEmits(['update:currentPage', 'update:perPage'])

const perPageModel = computed({
  get: () => props.perPage,
  set: (value) => emit('update:perPage', value)
})

const totalPages = computed(() => Math.ceil(props.total / props.perPage))

const startItem = computed(() => {
  if (props.total === 0) return 0
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  const end = props.currentPage * props.perPage
  return end > props.total ? props.total : end
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}
</script>
