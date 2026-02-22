<template>
  <div class="container mx-auto px-4 py-10 max-w-6xl">
    <div class="mb-8 animate-fadeIn">
      <h1 class="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 mb-2">
        {{ isEditMode ? "✏️ Edit Tax Invoice" : "📝 Create Tax Invoice" }}
      </h1>
      <p class="text-gray-600">{{ isEditMode ? "Update invoice details" : "Generate a professional tax invoice for your customers" }}</p>
    </div>

    <form v-if="!loading" @submit.prevent="handleSubmit" class="bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Invoice Number <span class="text-red-500">*</span></label>
          <input
            v-model="formData.invoiceNumber"
            type="text"
            required
            placeholder="enter invoice number"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-300"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 text-sm font-bold">Invoice Date <span class="text-red-500">*</span></label>
          <input
            v-model="formData.invoiceDate"
            type="date"
            required
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-300"
          />
        </div>

        <div class="space-y-2 md:col-span-2">
          <label class="flex items-center text-gray-700 text-sm font-bold">
            <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
              ></path>
            </svg>
            Select Customer <span class="text-red-500 ml-1">*</span>
          </label>
          <div class="relative group">
            <select
              v-model="selectedCustomer"
              @change="selectCustomer"
              required
              class="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-300 bg-gradient-to-r from-white to-gray-50 appearance-none cursor-pointer"
            >
              <option value="">-- Choose a customer --</option>
              <option v-for="customer in customers" :key="customer.id" :value="customer">
                {{ customer.customerName }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="md:col-span-2" v-if="selectedCustomer">
          <div class="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-100">
            <h3 class="font-bold text-green-700 mb-3 text-lg">📋 Customer Details</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <p class="flex items-center"><span class="font-semibold text-gray-700 mr-2">📍 Address:</span> {{ formData.address }}</p>
              <p class="flex items-center"><span class="font-semibold text-gray-700 mr-2">📞 Contact:</span> {{ formData.contact }}</p>
              <p class="flex items-center"><span class="font-semibold text-gray-700 mr-2">🏛️ State:</span> {{ formData.state }}</p>
              <p class="flex items-center">
                <span class="font-semibold text-gray-700 mr-2">💼 GST:</span> <span class="font-mono">{{ formData.gstNumber }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <label class="flex items-center text-gray-700 text-sm font-bold">
            <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
              <path
                d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"
              ></path>
            </svg>
            Delivery Mode
          </label>
          <input
            v-model="formData.delMode"
            type="text"
            placeholder="e.g., Courier, Self-Pickup"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-300 bg-gradient-to-r from-white to-gray-50"
          />
        </div>

        <div class="space-y-2">
          <label class="flex items-center text-gray-700 text-sm font-bold">
            <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Payment Mode
          </label>
          <div class="relative group">
            <select
              v-model="formData.paymentMode"
              class="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-300 bg-gradient-to-r from-white to-gray-50 appearance-none cursor-pointer"
            >
              <option>Cash</option>
              <option>Credit</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">📦 Products</h3>
          <button
            type="button"
            @click="addProductRow"
            class="inline-flex items-center bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 py-2 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ➕ Add Product
          </button>
        </div>

        <div class="space-y-3">
          <div
            v-for="(item, index) in formData.products"
            :key="index"
            class="bg-gray-50 p-4 rounded-xl border-2 border-gray-100 hover:border-green-200 transition-all duration-300"
          >
          
            <div class="grid grid-cols-1 md:grid-cols-6 gap-3">
              <select
                v-model="item.product"
                @change="updateProduct(index)"
                class="px-2 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Product</option>
                <option v-for="product in products" :key="product.id" :value="product">
                  {{ product.productName }}
                </option>
              </select>
              <input
                v-model.number="item.quantity"
                type="number"
                placeholder="Quantity"
                class="px-2 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                v-model.number="item.weight"
                type="number"
                placeholder="Weight"
                class="px-2 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                v-model.number="item.price"
                type="number"
                placeholder="Price"
                class="px-2 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                v-model.number="item.vat"
                type="text"
                placeholder="VAT"
                class="px-2 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                :value="(item.weight * item.price).toFixed(2)"
                readonly
                placeholder="Total"
                class="px-3 py-2 border-2 border-gray-200 rounded-lg bg-green-50 font-bold text-green-700"
              />
              <button
                type="button"
                @click="removeProduct(index)"
                class="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 font-bold shadow-md hover:shadow-lg"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <div class="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-2xl shadow-xl">
          <div class="flex justify-between items-center">
            <span class="text-xl font-semibold">Total Amount</span>
            <span class="text-4xl font-extrabold">₹{{ calculateTotal.toLocaleString() }}</span>
          </div>
        </div>
      </div>

      <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          @click="$router.back()"
          class="px-8 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold text-gray-700 shadow-md hover:shadow-lg"
        >
          ← Cancel
        </button>
        <button
          type="submit"
          class="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {{ isEditMode ? "✓ Update Invoice" : "✓ Create Invoice" }}
        </button>
      </div>
    </form>

    <div v-else class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import { invoiceService, customerService, productService } from "../services/api";

const router = useRouter();
const route = useRoute();

const isEditMode = computed(() => !!route.params.id);
const loading = ref(true); // Start as true to show spinner initially

const formData = ref({
  invoiceNumber: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  delMode: "",
  userName: localStorage.getItem("username"),
  products: [],
  customerId: "",
  customerName: "",
  address: "",
  state: "",
  contact: "",
  gstNumber: "",
  paymentMode: "Cash",
  totalAmount: "0",
  payment: "",
  paymentDate: "",
});

const customers = ref([]);
const products = ref([]);
const selectedCustomer = ref("");

const calculateSubtotal = computed(() => {
  return formData.value.products.reduce((sum, item) => {
    return sum + item.weight * item.price;
  }, 0);
});

const calculateTotalTax = computed(() => {
  return formData.value.products.reduce((sum, item) => {
    const itemTotal = item.weight * item.price;
    const tax = (itemTotal * (item.vat || 0)) / 100;
    return sum + tax;
  }, 0);
});

const calculateTotal = computed(() => {
  return calculateSubtotal.value + calculateTotalTax.value;
});

const selectCustomer = () => {
  if (selectedCustomer.value) {
    formData.value.customerId = selectedCustomer.value.customerId;
    formData.value.customerName = selectedCustomer.value.customerName;
    formData.value.address = selectedCustomer.value.address;
    formData.value.state = selectedCustomer.value.state;
    formData.value.contact = selectedCustomer.value.contact;
    formData.value.gstNumber = selectedCustomer.value.gstNumber;
  }
};

const addProductRow = () => {
  formData.value.products.push({ product: "", quantity: 1, weight: 0, price: 0, vat: 0 });
};

const removeProduct = (index) => {
  formData.value.products.splice(index, 1);
};

const updateProduct = (index) => {
  const item = formData.value.products[index];
  if (item.product) {
    item.price = item.product.price;
    item.vat = item.product.vat || 0;
    item.weight = item.product.weight || 0;
  }
};

const handleSubmit = async () => {
  // Validate that at least one product is added
  if (!formData.value.products || formData.value.products.length === 0) {
    alert("⚠️ Please add at least one product before submitting the invoice.");
    return;
  }

  // Validate that all products have required fields
  const invalidProduct = formData.value.products.find(
    (item) => !item.product || !item.weight || item.quantity <= 0 || !item.price || item.price <= 0,
  );

  if (invalidProduct) {
    alert("⚠️ Please ensure all products have valid product selection, quantity, and price.");
    return;
  }

  formData.value.totalAmount = calculateTotal.value.toString();
  try {
    if (isEditMode.value) {
      await invoiceService.update(route.params.id, formData.value);
      alert("Invoice updated successfully!");
    } else {
      const response = await invoiceService.create(formData.value);
      alert("Invoice created successfully!");

      if (confirm("Would you like to generate the PDF invoice now?")) {
        router.push({ name: "pdfGenerator", params: { id: response.data.id } });
        return;
      }
    }
    router.push("/invoices");
  } catch (error) {
    console.error("Error:", error);
    alert(`Failed to ${isEditMode.value ? "update" : "create"} invoice`);
  }
};

const loadInvoice = async () => {
  try {
    const response = await invoiceService.findOne(route.params.id);
    const invoice = response.data;

    console.log("Loading invoice:", invoice); // Debug log
    console.log("Available products:", products.value); // Debug log

    // Map products - handle different data structures
    const mappedProducts = (invoice.products || []).map((invProduct) => {
      // Handle if invProduct.product is an object or if the data is flat
      let productData = invProduct.product || invProduct;

      // Find matching product from products list by id or name
      let productObj = null;
      if (productData.id) {
        productObj = products.value.find((p) => p.id === productData.id);
      }
      if (!productObj && productData.productName) {
        productObj = products.value.find((p) => p.productName === productData.productName);
      }

      return {
        product: productObj || productData,
        quantity: invProduct.quantity || 1,
        weight: invProduct.weight || 0,
        price: invProduct.price || 0,
        vat: invProduct.vat || 0,
      };
    });

    console.log("Mapped products:", mappedProducts); // Debug log

    // Populate form data
    formData.value = {
      invoiceNumber: invoice.invoiceNumber || "",
      invoiceDate: invoice.invoiceDate || new Date().toISOString().split("T")[0],
      delMode: invoice.delMode || "",
      userName: invoice.userName || localStorage.getItem("username"),
      customerId: invoice.customerId || "",
      customerName: invoice.customerName || "",
      address: invoice.address || "",
      state: invoice.state || "",
      contact: invoice.contact || "",
      gstNumber: invoice.gstNumber || "",
      paymentMode: invoice.paymentMode || "Cash",
      totalAmount: invoice.totalAmount || "0",
      payment: invoice.payment || "",
      paymentDate: invoice.paymentDate || "",
      products: mappedProducts,
    };

    // Set selected customer
    const customer = customers.value.find((c) => c.customerId === invoice.customerId);
    if (customer) {
      selectedCustomer.value = customer;
    }

    console.log("Form data populated:", formData.value); // Debug log
    console.log("Selected customer:", selectedCustomer.value); // Debug log
  } catch (error) {
    console.error("Error loading invoice:", error);
    alert("Failed to load invoice: " + (error.response?.data?.message || error.message));
    router.push("/invoices");
  }
};

const fetchNextInvoiceNumber = async () => {
  try {
    const response = await invoiceService.getLastRecord();
    // API returns an array with one element or empty array
    if (response.data && response.data.length > 0 && response.data[0].invoiceNumber) {
      // Extract the number from the last invoice number and increment
      const lastNumber = parseInt(response.data[0].invoiceNumber);
      formData.value.invoiceNumber = (lastNumber + 1).toString();
    } else {
      // No records found, start from 47
      formData.value.invoiceNumber = "47";
    }
  } catch (error) {
    console.error("Error fetching last invoice number:", error);
    // If API call fails or no records found, start from 47
    formData.value.invoiceNumber = "47";
  }
};

onMounted(async () => {
  loading.value = true;
  try {
    // First, load customers and products
    const [custResp, prodResp] = await Promise.all([customerService.getAll(), productService.getAll()]);
    customers.value = custResp.data;
    products.value = prodResp.data;

    // Then load invoice data if in edit mode
    if (isEditMode.value) {
      await loadInvoice();
    } else {
      // If creating new invoice, fetch and set next invoice number
      await fetchNextInvoiceNumber();
    }
  } catch (error) {
    console.error("Error loading data:", error);
    alert("Failed to load data");
  } finally {
    loading.value = false;
  }
});
</script>
