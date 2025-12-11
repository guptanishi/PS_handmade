<template>
  <div class="container mx-auto px-4 py-3">
    <div class="relative z-10">
      <div class="text-center mb-4 animate-fadeIn">
        <h1 class="text-2xl font-extrabold mb-1 tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Welcome to PAPER FACTORY
          </span>
        </h1>
        <p class="text-sm text-gray-600 mb-2 font-light">Inventory & Invoice Management System</p>
    
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-4 mt-15">
        <!-- Products Card -->
        <div class="group relative bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-bl-full opacity-50"></div>
          
          <div class="relative z-10">
            <h3 class="text-base font-bold mb-1.5 text-gray-800 group-hover:text-indigo-600 transition-colors">Products</h3>
            <p class="text-xs text-gray-600 mb-2 leading-relaxed">Manage your product inventory with ease.</p>
            
            <router-link to="/products" class="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-xs shadow-md hover:shadow-lg">
              <span>View Products</span>
              <svg class="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>
        </div>
        
        <!-- Customers Card -->
        <div class="group relative bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-bl-full opacity-50"></div>
          
          <div class="relative z-10">
            <h3 class="text-base font-bold mb-1.5 text-gray-800 group-hover:text-purple-600 transition-colors">Customers</h3>
            <p class="text-xs text-gray-600 mb-2 leading-relaxed">Manage customer information easily.</p>
            
            <router-link to="/customers" class="inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-md hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold text-xs shadow-md hover:shadow-lg">
              <span>View Customers</span>
              <svg class="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>
        </div>
        
        <!-- Invoices Card -->
        <div class="group relative bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
          <div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-100 to-teal-100 rounded-bl-full opacity-50"></div>
          
          <div class="relative z-10">
            <h3 class="text-base font-bold mb-1.5 text-gray-800 group-hover:text-green-600 transition-colors">Invoices</h3>
            <p class="text-xs text-gray-600 mb-2 leading-relaxed">Create professional tax invoices.</p>
            
            <router-link to="/invoices" class="inline-flex items-center justify-center w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-3 py-1.5 rounded-md hover:from-green-700 hover:to-teal-700 transition-all duration-300 font-semibold text-xs shadow-md hover:shadow-lg">
              <span>View Invoices</span>
              <svg class="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
      
    
      
      <div class="text-center bottom-0">
        <div class="inline-flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
          <span class="text-xs text-gray-600 font-medium">Powered by</span>
          <span class="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">PAPER FACTORY</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
