<template>
  <div class="animate-pulse">
    <div v-if="type === 'table'">
      <div class="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gradient-to-r from-gray-100 to-gray-50">
              <tr>
                <th v-for="i in columns" :key="i" class="px-6 py-4">
                  <div class="h-4 bg-gray-300 rounded w-24"></div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="row in rows" :key="row" class="hover:bg-gray-50">
                <td v-for="col in columns" :key="col" class="px-6 py-4">
                  <div class="h-4 bg-gray-200 rounded" :class="getRandomWidth()"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <div v-else-if="type === 'card'" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="i in count" :key="i" class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div class="flex-1">
            <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="h-3 bg-gray-200 rounded"></div>
          <div class="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
    
    <div v-else-if="type === 'form'" class="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="i in count" :key="i" class="space-y-2">
          <div class="h-4 bg-gray-300 rounded w-1/3"></div>
          <div class="h-12 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
      <div class="flex justify-end space-x-4 mt-8 pt-6 border-t-2 border-gray-100">
        <div class="h-12 bg-gray-200 rounded-xl w-32"></div>
        <div class="h-12 bg-gray-300 rounded-xl w-40"></div>
      </div>
    </div>
    
    <div v-else class="space-y-3">
      <div v-for="i in count" :key="i">
        <div class="h-4 bg-gray-300 rounded" :class="getRandomWidth()"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'table', 'card', 'form'].includes(value)
  },
  rows: {
    type: Number,
    default: 5
  },
  columns: {
    type: Number,
    default: 6
  },
  count: {
    type: Number,
    default: 3
  }
})

const widths = ['w-full', 'w-5/6', 'w-4/6', 'w-3/6', 'w-2/6']

const getRandomWidth = () => {
  return widths[Math.floor(Math.random() * widths.length)]
}
</script>
