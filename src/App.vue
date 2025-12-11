<template>
  <div id="app" class="min-h-screen pattern-dots">
    <Toast />
    
    <nav v-if="showNav" class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl relative overflow-hidden">
  
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="flex items-center justify-between py-4">
          <router-link to="/home" class="flex items-center space-x-3 group">
            <div class="relative">
              <div class="absolute inset-0 bg-yellow-400 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div class="relative bg-white/20 backdrop-blur-sm p-2 rounded-xl border-2 border-white/30">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h1 class="text-2xl font-extrabold tracking-tight">PAPER FACTORY</h1>
              <p class="text-xs text-white/80 font-medium">Inventory Management</p>
            </div>
          </router-link>
          
          <div v-if="isAuthenticated" class="flex space-x-1">
            <router-link to="/products" class="group flex flex-col items-center px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-white/30">
              <svg class="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
              <span class="text-xs font-semibold opacity-90 group-hover:opacity-100">Products</span>
            </router-link>
            <router-link to="/products/create" class="group flex flex-col items-center px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-white/30">
              <svg class="w-5 h-5 mb-1 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              <span class="text-xs font-semibold opacity-90 group-hover:opacity-100">Add Product</span>
            </router-link>
            <router-link to="/customers" class="group flex flex-col items-center px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-white/30">
              <svg class="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span class="text-xs font-semibold opacity-90 group-hover:opacity-100">Customers</span>
            </router-link>
            <router-link to="/customers/create" class="group flex flex-col items-center px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-white/30">
              <svg class="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              <span class="text-xs font-semibold opacity-90 group-hover:opacity-100">Add Customer</span>
            </router-link>
            <router-link to="/invoices/create" class="group flex flex-col items-center px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-white/30">
              <svg class="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span class="text-xs font-semibold opacity-90 group-hover:opacity-100">Tax Invoice</span>
            </router-link>
            <router-link to="/invoices" class="group flex flex-col items-center px-3 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-white/30">
              <svg class="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span class="text-xs font-semibold opacity-90 group-hover:opacity-100">Invoices</span>
            </router-link>
          </div>

          <div v-if="showUserMenu" class="relative">
            <button @click="logout" class="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-all duration-300 border-2 border-white/30 shadow-lg hover:shadow-xl group">
              <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ring-2 ring-white/50 group-hover:ring-white/80 transition-all">
               <svg class="w-5 h-5 ml-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
              </div>
              <div class="text-left">
                <p class="font-bold text-sm">{{ username }}</p>
                <p class="text-xs opacity-80">Logout</p>
              </div>
           
            </button>
         
          </div>
        </div>
      </div>
    </nav>

    <main class="pb-12 ">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Toast from './components/Toast.vue'

const router = useRouter()
const route = useRoute()

const username = ref(localStorage.getItem('username') || '')
const dropdownOpen = ref(false)

const isAuthenticated = computed(() => {
  return route.name !== 'login' && route.name !== 'home'
})

const showNav = computed(() => {
  return route.name !== 'login'
})

const showUserMenu = computed(() => {
  return route.name !== 'login' && username.value
})


const logout = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('password')
  username.value = ''
  router.push('/')
}

watch(route, () => {
  username.value = localStorage.getItem('username') || ''
  dropdownOpen.value = false
})
</script>

