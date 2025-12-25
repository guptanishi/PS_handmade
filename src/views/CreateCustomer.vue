<template>
  <div class="container mx-auto px-4 py-10 max-w-5xl">
    <div class="mb-8 animate-fadeIn">
      <h1 class="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
        👤 Create New Customer
      </h1>
      <p class="text-gray-600">Add a new customer to your directory</p>
    </div>
    
    <form @submit.prevent="handleSubmit" class="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2 md:col-span-2">
          <label class="block text-gray-700 text-sm font-bold">Customer ID <span class="text-red-500">*</span></label>
          <input 
            v-model="formData.customerId" 
            type="text" 
            required 
            placeholder="e.g., CUST001"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2 md:col-span-2">
          <label class="block text-gray-700 text-sm font-bold">Customer Name <span class="text-red-500">*</span></label>
          <input 
            v-model="formData.customerName" 
            type="text" 
            required 
            placeholder="Enter customer full name"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">City</label>
          <input 
            v-model="formData.city" 
            type="text" 
            placeholder="e.g., Mumbai"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">State</label>
          <input 
            v-model="formData.state" 
            type="text" 
            placeholder="e.g., Maharashtra"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2 md:col-span-2">
          <label class="block text-gray-700 text-sm font-bold">Address</label>
          <textarea 
            v-model="formData.address" 
            placeholder="Enter full address..."
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
            rows="3"
          ></textarea>
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Pincode</label>
          <input 
            v-model.number="formData.pincode" 
            type="number" 
            placeholder="e.g., 400001"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Contact Number</label>
          <input 
            v-model.number="formData.contact" 
            type="number" 
            maxlength="10"
            placeholder="e.g., 9876543210"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Email Address</label>
          <input 
            v-model="formData.emailId" 
            type="email" 
            placeholder="customer@example.com"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300" 
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">GST Number</label>
          <input 
            v-model="formData.gstNumber" 
            type="text" 
            placeholder="e.g., 22AAAAA0000A1Z5"
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
          ✓ Create Customer
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { customerService } from '../services/api'

const router = useRouter()

const formData = ref({
  customerId: '',
  customerName: '',
  city: '',
  address: '',
  state: '',
  pincode: '',
  contact: '',
  emailId: '',
  gstNumber: ''
})

const handleSubmit = async () => {
  try {
    await customerService.create(formData.value)
    alert('Customer created successfully!')
    router.push('/customers')
  } catch (error) {
    console.error('Error:', error)
    alert('Failed to create customer')
  }
}
</script>
