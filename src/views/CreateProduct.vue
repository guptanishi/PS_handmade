<template>
  <div class="container mx-auto px-4 py-3 max-w-4xl">
    <!-- Page Header -->
    <div class="mb-4 animate-fadeIn">
      <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg p-0.5 shadow-lg">
        <div class="bg-white rounded-lg p-3">
          <div class="flex items-center space-x-3">
            <div class="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Create New Product
              </h1>
              <p class="text-xs text-gray-600">Add a new product to your inventory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <form @submit.prevent="handleSubmit" class="bg-white shadow-lg rounded-lg p-4 border border-gray-100">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="space-y-1">
          <label class="flex items-center text-gray-700 text-sm font-bold">
            <svg class="w-4 h-4 mr-1 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
            </svg>
            Product Code <span class="text-red-500 ml-1">*</span>
          </label>
          <div class="relative group">
            <input
              v-model="formData.productCode"
              type="text"
              required
              placeholder="e.g., PRD001"
              class="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="space-y-1">
          <label class="flex items-center text-gray-700 text-sm font-bold">
            <svg class="w-3 h-3 mr-1 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"></path>
            </svg>
            Product Name <span class="text-red-500 ml-1">*</span>
          </label>
          <input
            v-model="formData.productName"
            type="text"
            required
            placeholder="e.g., Premium Widget"
            class="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Size <span class="text-red-500">*</span></label>
          <input
            v-model="formData.size"
            type="text"
            required
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
          />
        </div>
        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Weight <span class="text-red-500">*</span></label>
          <input
            v-model="formData.weight"
            type="text"
            required
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 hover:border-indigo-300"
          />
        </div>


        <div class="space-y-1">
          <label class="flex items-center text-gray-700 text-sm font-bold">
            <svg class="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
            </svg>
            Selling Price <span class="text-red-500 ml-1">*</span>
          </label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-semibold">₹</span>
            <input
              v-model.number="formData.price"
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              class="w-full pl-7 pr-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div class="space-y-1">
          <label class="flex items-center text-gray-700 text-sm font-bold">
            <svg class="w-3 h-3 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            GST (%)
          </label>
          <div class="relative">
            <input
              v-model.number="formData.vat"
              type="number"
              step="0.01"
              placeholder="0.00"
              class="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
            <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-semibold">%</span>
          </div>
        </div>

        <div class="space-y-1">
          <label class="flex items-center text-gray-700 text-sm font-bold">
            <svg class="w-3 h-3 mr-1 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
            </svg>
            HSN Code <span class="text-red-500 ml-1">*</span>
          </label>
          <input
            v-model.number="formData.HSN"
            type="number"
            required
            placeholder="e.g., 12345678"
            class="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div class="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          @click="$router.back()"
          class="px-4 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-semibold text-gray-700 shadow-sm flex items-center space-x-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          class="px-4 py-1.5 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-md flex items-center space-x-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Create Product</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { productService } from '../services/api'
import { useToastStore } from '../stores/toast'

const router = useRouter()
const toast = useToastStore()

const formData = ref({
  productCode: '',
  productName: '',
  size: '',
  weight: 0,
  costPrice: 0,
  price: 0,
  vat: 0,
  qtyAvailable: 0,
  unit: 'kg',
  HSN: ''
})

const handleSubmit = async () => {
  try {
    await productService.create(formData.value)
    toast.success(`Product "${formData.value.productName}" created successfully!`)
    router.push('/products')
  } catch (error) {
    console.error('Error creating product:', error)
    toast.error('Failed to create product. Please try again.')
  }
}
</script>
