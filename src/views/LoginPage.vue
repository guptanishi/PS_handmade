<template>
<div class="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div
        class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
      >
        <div
          class="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
        >
          <div class="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">PS HANDPAPER</a>
          </div>
          <p class="mt-6 font-normal text-center text-gray-300 md:mt-0">
            Paper inventory and billing management system for small businesses
          </p>
          
          
        </div>
        <div class="p-5 bg-white md:flex-1">
          <h3 class="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
          <form action="#" class="flex flex-col space-y-5">
            <div class="flex flex-col space-y-1">
              <label for="username" class="text-sm font-semibold text-gray-500">User Name</label>
              <input
                type="text"
                id="username"
                autofocus
                :value="username"
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div class="flex flex-col space-y-1">
              <div class="flex items-center justify-between">
                <label for="password" class="text-sm font-semibold text-gray-500">Password</label>
                <a href="#" class="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a>
              </div>
              <input
                type="password"
                id="password"
                :value="password"
                class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>

            <div>
              <button
               @click="handleSubmit"
                type="submit"
                class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
</template>

<script setup>
import { handleError, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('admin')
const password = ref('1234')

const handleSubmit = () => {
  if (username.value == 'admin' && password.value == '1234') {
    // Only store username for convenience; avoid storing passwords in localStorage
    localStorage.setItem('username', username.value)
  router.push({name: 'home'});
  } else {
    alert('Invalid Username or Password! Please try again')
  }
}
</script>