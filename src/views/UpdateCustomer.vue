<template>
  <div class="container mx-auto px-4 py-10 max-w-5xl">
    <div class="mb-8 animate-fadeIn">
      <h1 class="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
        ✏️ Update Customer
      </h1>
      <p class="text-gray-600">Modify customer information in your directory</p>
    </div>
    
    <form v-if="formData" @submit.prevent="handleSubmit" class="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2 md:col-span-2">
          <label class="block text-gray-700 text-sm font-bold">Customer ID <span class="text-red-500">*</span></label>
          <input 
            v-model="formData.customerId" 
            type="text" 
            required 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2 md:col-span-2">
          <label class="block text-gray-700 text-sm font-bold">Customer Name <span class="text-red-500">*</span></label>
          <input 
            v-model="formData.customerName" 
            type="text" 
            required 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">City</label>
          <input 
            v-model="formData.city" 
            type="text" 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">State</label>
          <input 
            v-model="formData.state" 
            type="text" 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2 md:col-span-2">
          <label class="block text-gray-700 text-sm font-bold">Address</label>
          <textarea 
            v-model="formData.address" 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
            rows="3"
          ></textarea>
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Pincode</label>
          <input 
            v-model.number="formData.pincode" 
            type="number" 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Contact Number</label>
          <input 
            v-model.number="formData.contact" 
            type="number" 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Email Address</label>
          <input 
            v-model="formData.emailId" 
            type="email" 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">GST Number</label>
          <input 
            v-model="formData.gstNumber" 
            type="text" 
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300 font-mono" 
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
          class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          ✓ Update Customer
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { customerService } from '../services/api'

const router = useRouter()
const route = useRoute()
const formData = ref(null)

onMounted(() => {
  if (history.state && history.state.customer) {
    formData.value = { ...history.state.customer }
  }
})

const handleSubmit = async () => {
  try {
    await customerService.update(route.params.id, formData.value)
    alert('Customer updated successfully!')
    router.push('/customers')
  } catch (error) {
    console.error('Error:', error)
    alert('Failed to update customer')
  }
}
</script>
