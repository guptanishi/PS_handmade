<template>
  <nav aria-label="Breadcrumb" class="mb-6">
    <ol class="flex items-center space-x-2 text-sm">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
        <router-link
          v-if="crumb.to && index < breadcrumbs.length - 1"
          :to="crumb.to"
          class="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium"
        >
          <svg v-if="index === 0" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
          </svg>
          {{ crumb.label }}
        </router-link>
        <span v-else class="text-gray-800 font-semibold flex items-center">
          <svg v-if="index === 0" class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
          </svg>
          {{ crumb.label }}
        </span>
        <svg
          v-if="index < breadcrumbs.length - 1"
          class="w-4 h-4 mx-2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
    // Example: [{ label: 'Home', to: '/' }, { label: 'Products' }]
  }
})
</script>
