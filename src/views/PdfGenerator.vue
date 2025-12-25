<!-- InvoiceParasar.vue -->
<template>
  <div class="bg-gray-100 p-6">
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
    </div>

    <div v-else-if="invoice" class="space-y-4">
      <div class="flex justify-end gap-3 mb-4">
        <button 
          @click="downloadPdf" 
          class="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-lg"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Download PDF
        </button>
        <button 
          @click="router.push('/invoices')" 
          class="inline-flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 font-semibold shadow-lg"
        >
          ← Back
        </button>
      </div>

      <!-- A4-ish container -->
      <div
        id="invoice-content"
        class="mx-auto bg-white border border-red-600 p-4 text-[11px] leading-tight max-w-[800px]"
      >
        <!-- Top row: GSTN / TIN / Phone -->
        <div class="flex justify-between text-[10px] mb-1">
          <div>
            <div>GSTN : {{ companyInfo.gstn }}</div>
            <div>TIN No. : {{ companyInfo.tin }}</div>
          </div>
          <div class="text-center font-semibold">
            TAX INVOICE
          </div>
          <div class="text-right">
            <div>Mob.: {{ companyInfo.mobile1 }}</div>
            <div>{{ companyInfo.mobile2 }}</div>
          </div>
        </div>

        <div class="text-[9px] text-center mb-1">
          (ALL SUBJECT TO ORAI JURISDICTION) |
          Approved Unit by Khadi &amp; Village Industries Board, LUCKNOW
        </div>

        <!-- Company name & address -->
        <div class="border-y border-red-600 py-1 mb-2">
          <div class="text-center font-extrabold text-lg tracking-wide">
            {{ companyInfo.name }}
          </div>
          <div class="text-center text-[10px]">
            {{ companyInfo.addressLine1 }}
          </div>
          <div class="text-center text-[10px]">
            {{ companyInfo.addressLine2 }}
          </div>
          <div class="text-center text-[10px] font-semibold mt-1">
            MANUFACTURERS OF ALL KINDS OF EXPORT QUALITY HAND MADE PAPERS
          </div>
        </div>

        <!-- Bill meta -->
        <div class="grid grid-cols-3 gap-2 mb-2 text-[10px]">
          <div>
            <span class="font-semibold">Bill No.</span>
            <span class="inline-block border-b border-red-600 w-32 ml-1">
              {{ invoice.invoiceNumber }}
            </span>
          </div>
          <div class="col-span-2 text-right">
            <span class="font-semibold">Date :</span>
            <span class="inline-block border-b border-red-600 w-32 ml-1 text-right">
              {{ invoice.invoiceDate }}
            </span>
          </div>
          <div class="col-span-3">
            <span class="font-semibold">Purchaser&nbsp;:</span>
            <span class="inline-block border-b border-red-600 w-[80%] ml-1">
              {{ invoice.customerName }}
            </span>
          </div>
          <div class="col-span-2">
            <span class="font-semibold">Address&nbsp;:</span>
            <span class="inline-block border-b border-red-600 w-20 ml-1">
              {{ invoice.address }}
            </span>
          </div>
          <div>
            <span class="font-semibold">State&nbsp;:</span>
            <span class="inline-block border-b border-red-600 w-28 ml-1">
              {{ invoice.state }}
            </span>
          </div>
          <div>
            <span class="font-semibold">GSTIN/UIN&nbsp;:</span>
            <span class="inline-block border-b border-red-600 w-28 ml-1">
              {{ invoice.gstNumber }}
            </span>
          </div>
        </div>

        <!-- Main items table -->
        <div class="border border-red-600 mb-2">
          <!-- Header -->
          <div class="grid grid-cols-[60px_2fr_100px_100px_100px] border-b border-red-600 text-[10px] font-semibold text-center">
            <div class="border-r border-red-600 py-1">Qty</div>
            <div class="border-r border-red-600 py-1">DESCRIPTION OF GOODS</div>
            <div class="border-r border-red-600 py-1">VAT %</div>
            <div class="border-r border-red-600 py-1">RATE</div>
            <div class="py-1">AMOUNT</div>
          </div>

          <!-- Rows -->
          <div
            v-for="(item, idx) in invoice.products"
            :key="idx"
            class="grid grid-cols-[60px_2fr_100px_100px_100px] text-[10px] min-h-[24px]"
          >
            <div class="border-r border-red-600 border-b py-0.5 text-center">
              {{ item.quantity }}
            </div>
            <div class="border-r border-red-600 border-b py-0.5 px-1">
              {{ item.product.productName }}
            </div>
            <div class="border-r border-red-600 border-b py-0.5 text-center">
              {{ item.vat }}%
            </div>
            <div class="border-r border-red-600 border-b py-0.5 text-center">
              ₹{{ item.price }}
            </div>
            <div class="border-b py-0.5 text-center">
              ₹{{ (item.quantity * item.price).toFixed(2) }}
            </div>
          </div>

          <!-- Empty rows for spacing -->
          <div
            v-for="n in 3"
            :key="'empty-' + n"
            class="grid grid-cols-[60px_2fr_100px_100px_100px] text-[10px] min-h-[20px]"
          >
            <div class="border-r border-red-600 border-b"></div>
            <div class="border-r border-red-600 border-b"></div>
            <div class="border-r border-red-600 border-b"></div>
            <div class="border-r border-red-600 border-b"></div>
            <div class="border-b"></div>
          </div>
        </div>

        <!-- Totals section -->
        <div class="grid grid-cols-[1.5fr_1fr] gap-2 text-[10px] mb-2">
          <!-- Left: Payment details -->
          <div class="border border-red-600 p-2">
            <div class="font-semibold mb-1">Payment Details</div>
            <div><span class="font-semibold">Mode:</span> {{ invoice.paymentMode }}</div>
            <div><span class="font-semibold">Delivery Mode:</span> {{ invoice.delMode || 'N/A' }}</div>
            
            <div class="mt-3">
              <div class="font-semibold mb-1">Amount In Words:</div>
              <div class="min-h-[32px] border border-red-600 p-1">
                {{ amountInWords }}
              </div>
            </div>
          </div>

          <!-- Right: totals -->
          <div class="border border-red-600">
            <div class="grid grid-cols-2 text-[10px]">
              <div class="border-b border-red-600 px-1 py-0.5">
                Subtotal
              </div>
              <div class="border-b border-l border-red-600 px-1 py-0.5 text-right">
                ₹{{ calculateSubtotal.toFixed(2) }}
              </div>

              <div class="border-b border-red-600 px-1 py-0.5">
                Tax (VAT)
              </div>
              <div class="border-b border-l border-red-600 px-1 py-0.5 text-right">
                ₹{{ calculateTax.toFixed(2) }}
              </div>

              <div class="px-1 py-1 font-bold">
                Total Amount
              </div>
              <div class="border-l border-red-600 px-1 py-1 text-right font-bold">
                ₹{{ invoice.totalAmount }}
              </div>
            </div>
          </div>
        </div>

        <!-- Terms & signature -->
        <div class="border border-red-600 p-2 text-[9px]">
          <div class="font-semibold mb-1">Terms &amp; Conditions :</div>
          <ol class="list-decimal list-inside space-y-0.5 mb-2">
            <li>Goods Once Sold Will Not Be Taken Back.</li>
            <li>Payment terms as agreed upon invoice generation.</li>
            <li>Any disputes subject to local jurisdiction.</li>
          </ol>

          <div class="flex justify-between items-end mt-4">
            <div class="text-[9px]">
              Customer Signature
              <div class="border-t border-red-600 w-32 mt-8"></div>
            </div>
            <div class="text-right text-[10px]">
              For- <span class="font-semibold">{{ companyInfo.name }}</span>
              <div class="mt-6 border-t border-red-600 pt-1 text-[9px]">
                Authorized Signatory
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <p class="text-red-500 text-lg">Invoice not found</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { invoiceService } from '../services/api'

const route = useRoute()
const router = useRouter()
const invoice = ref(null)
const loading = ref(false)

const companyInfo = {
  name: 'PARASAR HATH KAGAZ UDYOG',
  gstn: '09AABCP1234F1Z5',
  tin: '09123456789',
  mobile1: '+91 9876543210',
  mobile2: '+91 9876543211',
  addressLine1: 'Village Parasar, District Orai',
  addressLine2: 'Uttar Pradesh - 285001, India'
}

const calculateSubtotal = computed(() => {
  if (!invoice.value?.products) return 0
  return invoice.value.products.reduce((sum, item) => sum + (item.quantity * item.price), 0)
})

const calculateTax = computed(() => {
  if (!invoice.value?.products) return 0
  return invoice.value.products.reduce((sum, item) => {
    const itemTotal = item.quantity * item.price
    const tax = (itemTotal * (item.vat || 0)) / 100
    return sum + tax
  }, 0)
})

const amountInWords = computed(() => {
  if (!invoice.value) return ''
  const amount = parseFloat(invoice.value.totalAmount)
  return convertNumberToWords(amount)
})

const convertNumberToWords = (num) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
  
  if (num === 0) return 'Zero Rupees Only'
  
  const convertLessThanThousand = (n) => {
    if (n === 0) return ''
    if (n < 10) return ones[n]
    if (n < 20) return teens[n - 10]
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '')
    return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' ' + convertLessThanThousand(n % 100) : '')
  }
  
  const wholePart = Math.floor(num)
  let result = ''
  
  if (wholePart >= 10000000) {
    result += convertLessThanThousand(Math.floor(wholePart / 10000000)) + ' Crore '
    wholePart %= 10000000
  }
  if (wholePart >= 100000) {
    result += convertLessThanThousand(Math.floor(wholePart / 100000)) + ' Lakh '
    wholePart %= 100000
  }
  if (wholePart >= 1000) {
    result += convertLessThanThousand(Math.floor(wholePart / 1000)) + ' Thousand '
    wholePart %= 1000
  }
  if (wholePart > 0) {
    result += convertLessThanThousand(wholePart)
  }
  
  return result.trim() + ' Rupees Only'
}

const downloadPdf = () => {
  const filename = `Invoice_${invoice.value.invoiceNumber}_${invoice.value.customerName.replace(/\s+/g, '_')}.pdf`
  window.print()
}

const loadInvoice = async () => {
  loading.value = true
  try {
    const response = await invoiceService.findOne(route.params.id)
    invoice.value = response.data
  } catch (error) {
    console.error('Error loading invoice:', error)
    alert('Failed to load invoice')
  } finally {
    loading.value = false
  }
}

onMounted(loadInvoice)
</script>

<style>
@media print {
  body * {
    visibility: hidden;
  }
  #invoice-content, #invoice-content * {
    visibility: visible;
  }
  #invoice-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  button {
    display: none !important;
  }
}
</style>
