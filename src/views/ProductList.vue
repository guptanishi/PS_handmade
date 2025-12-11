<template>
  <div class="container mx-auto px-4 py-10">
    <Breadcrumb :breadcrumbs="[
      { label: 'Home', to: '/home' },
      { label: 'Products' }
    ]" />
    
    <div class="mb-8 animate-fadeIn">
      <h1 class="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
        📦 Product Inventory
      </h1>
      <p class="text-gray-600">Manage and track your products efficiently</p>
    </div>
    
    <div class="mb-6 flex flex-col sm:flex-row justify-end items-center gap-4 bg-white p-4 rounded-2xl shadow-md">
     
      <router-link
        to="/products/create"
        class="justify-end items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
      >
        <span class="mr-2">➕</span> Add New Product
      </router-link>
    </div>

    <SkeletonLoader v-if="loading" type="table" :rows="5" :columns="7" />
    
    <div v-else-if="paginatedProducts.length === 0">
      <EmptyState
        icon="📦"
        title="No Products Found"
        :message="searchQuery ? 'No products match your search. Try different keywords.' : 'Start building your inventory by adding your first product.'"
        :action-text="searchQuery ? '' : 'Create Product'"
        @action="$router.push('/products/create')"
      />
    </div>
    
    <div v-else>
      <div class="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Code</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Product Name</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Price</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Unit</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">HSN</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700">
                    {{ product.productCode }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">{{ product.productName }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-green-600 font-bold">₹{{ product.price.toLocaleString() }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ product.unit }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ product.HSN }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex space-x-3">
                    <button
                      @click="editProduct(product)"
                      class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      @click="confirmDelete(product)"
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
      </div>
      
      <Pagination
        v-if="filteredProducts.length > 0"
        v-model:current-page="currentPage"
        v-model:per-page="perPage"
        :total="filteredProducts.length"
        item-name="products"
      />
    </div>
    
    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete Product"
      :message="`Are you sure you want to delete '${productToDelete?.productName}'? This action cannot be undone.`"
      type="danger"
      confirm-text="Delete"
      cancel-text="Cancel"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { productService } from '../services/api'
import { useToastStore } from '../stores/toast'
import Breadcrumb from '../components/Breadcrumb.vue'
import SkeletonLoader from '../components/SkeletonLoader.vue'
import EmptyState from '../components/EmptyState.vue'
import Pagination from '../components/Pagination.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'

const router = useRouter()
const toast = useToastStore()

const products = ref([])
const searchQuery = ref('')
const loading = ref(false)
const currentPage = ref(1)
const perPage = ref(10)
const showDeleteDialog = ref(false)
const productToDelete = ref(null)

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter(p =>
    p.productName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    p.productCode.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return filteredProducts.value.slice(start, end)
})

const loadProducts = async () => {
  loading.value = true
  try {
    const response = await productService.getAll()
    products.value = response.data
    toast.success('Products loaded successfully')
  } catch (error) {
    console.error('Error loading products:', error)
    toast.error('Failed to load products. Please try again.')
  } finally {
    loading.value = false
  }
}

const editProduct = (product) => {
  router.push({ name: 'updateProduct', params: { id: product.id } })
  sessionStorage.setItem('product', JSON.stringify(product));
}

const confirmDelete = (product) => {
  productToDelete.value = product
  showDeleteDialog.value = true
}

const handleDelete = async () => {
  if (!productToDelete.value) return
  
  try {
    await productService.delete(productToDelete.value.id)
    toast.success(`Product "${productToDelete.value.productName}" deleted successfully`)
    await loadProducts()
  } catch (error) {
    console.error('Error deleting product:', error)
    toast.error('Failed to delete product. Please try again.')
  } finally {
    productToDelete.value = null
  }
}

onMounted(() => {
  loadProducts()
})
</script>
