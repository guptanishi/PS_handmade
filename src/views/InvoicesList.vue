<template>
  <div class="container mx-auto px-4 py-10">
    <div class="mb-8 animate-fadeIn">
      <h1 class="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 mb-2">
        📋 Invoice Management
      </h1>
      <p class="text-gray-600">Track and manage all your tax invoices</p>
    </div>
    
    <div class="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-md">
      <div class="relative w-full sm:w-96">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span class="text-gray-400 text-xl">🔍</span>
        </div>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search invoices by number or customer..." 
          class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
        />
      </div>
      <router-link 
        to="/invoices/create" 
        class="inline-flex items-center bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
      >
        <span class="mr-2">📝</span> Create Invoice
      </router-link>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
    </div>
    
    <div v-else class="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gradient-to-r from-green-50 to-teal-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Invoice #</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Date</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Products</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Customer</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-green-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="invoice in filteredInvoices" :key="invoice.id" class="hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 transition-all duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                  {{ invoice.invoiceNumber }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                <span class="inline-flex items-center">
                  📅 {{ dayjs(invoice.invoiceDate).format('DD/MM/YYYY') }}
                </span>
              </td>
               <td class="px-6 py-4 whitespace-nowrap text-gray-700" v-for="product in invoice.products" :key="product.id">
                <li class="inline-flex items-center">
                  {{ product.product.productName }}
                </li>
              </td>
              <td class="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">{{ invoice.customerName }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-green-600 font-bold text-lg">₹{{ Number(invoice.totalAmount).toLocaleString() }}</span>
              </td>
              
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-3">
                  <button 
                    @click="editInvoice(invoice.id)" 
                    class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    @click="downloadPdf(invoice.id)" 
                    class="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Download
                  </button>
                  <button 
                    @click="deleteInvoice(invoice.id)" 
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
      
      <div v-if="filteredInvoices.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">📋</div>
        <p class="text-gray-500 text-lg">No invoices found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { invoiceService } from '../services/api'
import dayjs from 'dayjs';

const router = useRouter()
const invoices = ref([])
const searchQuery = ref('')
const loading = ref(false)

const filteredInvoices = computed(() => {
  if (!searchQuery.value) return invoices.value
  return invoices.value.filter(inv =>
    inv.invoiceNumber?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    inv.customerName?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const loadInvoices = async () => {
  loading.value = true
  try {
    const response = await invoiceService.getAll()
    invoices.value = response.data
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
}

const editInvoice = (id) => {
  router.push({ name: 'editInvoice', params: { id } })
}

const downloadPdf = (id) => {
  // Open PDF generator in a new window
  const pdfUrl = `/pdf/${id}`
  window.open(pdfUrl, '_blank')
}

const deleteInvoice = async (id) => {
  if (confirm('Delete this invoice?')) {
    try {
      await invoiceService.delete(id)
      await loadInvoices()
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

onMounted(loadInvoices)
</script>
