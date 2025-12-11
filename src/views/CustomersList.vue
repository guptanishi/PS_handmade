<template>
  <div class="container mx-auto px-4 py-10">
    <div class="mb-8 animate-fadeIn">
      <h1 class="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
        👥 Customers Directory
      </h1>
      <p class="text-gray-600">Manage your customer relationships</p>
    </div>
    
    <div class="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-md">
      <div class="relative w-full sm:w-96">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span class="text-gray-400 text-xl">🔍</span>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search customers by name or ID..."
          class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
        />
      </div>
      <router-link 
        to="/customers/create" 
        class="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
      >
        <span class="mr-2">➕</span> Add New Customer
      </router-link>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600"></div>
    </div>
    
    <div v-else class="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gradient-to-r from-purple-50 to-pink-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">ID</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">Customer Name</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">City</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">Contact</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">GST Number</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="customer in filteredCustomers" :key="customer.id" class="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
                  {{ customer.customerId }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {{ customer.customerName.charAt(0).toUpperCase() }}
                  </div>
                  <span class="font-semibold text-gray-800">{{ customer.customerName }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                <span class="inline-flex items-center">
                  📍 {{ customer.city }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                <span class="inline-flex items-center">
                  📞 {{ customer.contact }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-3 py-1 rounded-lg text-sm font-mono bg-gray-100 text-gray-700">
                  {{ customer.gstNumber }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-3">
                  <button 
                    @click="editCustomer(customer)" 
                    class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    @click="deleteCustomer(customer.id)" 
                    class="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="filteredCustomers.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">👥</div>
        <p class="text-gray-500 text-lg">No customers found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { customerService } from '../services/api'

const router = useRouter()
const customers = ref([])
const searchQuery = ref('')
const loading = ref(false)

const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value
  return customers.value.filter(c =>
    c.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (c.customerId && c.customerId.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
})

const loadCustomers = async () => {
  loading.value = true
  try {
    const response = await customerService.getAll()
    customers.value = response.data
  } catch (error) {
    console.error('Error loading customers:', error)
  } finally {
    loading.value = false
  }
}

const editCustomer = (customer) => {
  router.push({ name: 'updateCustomer', params: { id: customer.id }, state: { customer } })
}

const deleteCustomer = async (id) => {
  if (confirm('Delete this customer?')) {
    try {
      await customerService.delete(id)
      await loadCustomers()
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

onMounted(loadCustomers)
</script>
