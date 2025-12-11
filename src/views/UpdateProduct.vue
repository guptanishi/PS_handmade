<template>
  <div class="container mx-auto px-4 py-10 max-w-5xl">
    <div class="mb-8 animate-fadeIn">
      <h1 class="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
        ✏️ Update Product
      </h1>
      <p class="text-gray-600">Modify product details in your inventory</p>
    </div>
    
    <form v-if="formData" @submit.prevent="handleSubmit" class="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Product Code <span class="text-red-500">*</span></label>
          <input
            v-model="formData.productCode"
            type="text"
            required
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Product Name <span class="text-red-500">*</span></label>
          <input
            v-model="formData.productName"
            type="text"
            required
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
          />
        </div>


        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Selling Price <span class="text-red-500">*</span></label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
            <input
              v-model.number="formData.price"
              type="number"
              step="0.01"
              required
              class="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">VAT (%)</label>
          <div class="relative">
            <input
              v-model.number="formData.vat"
              type="number"
              step="0.01"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
            />
            <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">%</span>
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Unit</label>
          <input
            v-model="formData.unit"
            type="text"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">HSN Code</label>
          <input
            v-model.number="formData.HSN"
            type="number"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
          />
        </div>
      </div>

      <div class="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          @click="$router.back()"
          class="px-8 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-gray-700 shadow-md hover:shadow-lg"
        >
          ← Cancel
        </button>
        <button
          type="submit"
          class="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          ✓ Update Product
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { productService } from '../services/api'

const router = useRouter()
const route = useRoute()

const formData = ref(null)

onMounted(() => {
  if (route.params.id) {
    console.log(route.params)
    const product = sessionStorage.getItem('product')
    formData.value = product ? JSON.parse(product) : null
  }
})

const handleSubmit = async () => {
  try {
    await productService.update(route.params.id, formData.value)
    alert('Product updated successfully!')
    router.push('/products')
  } catch (error) {
    console.error('Error updating product:', error)
    alert('Failed to update product')
  }
}
</script>
