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
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
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
        class="mx-auto bg-white border border-red-600 p-4 text-[21px] leading-tight max-w-[800px]"
        style="
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
          border: 1px solid black;
          padding: 16px;
          font-size: 15px;
          line-height: 1.25;
        "
      >
        <!-- Top row: GSTN / TIN / Phone -->
        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px">
          <div style="font-weight: 600">
            <div>GSTN : {{ companyInfo.gstn }}</div>
            <div>TIN No. : {{ companyInfo.tin }}</div>
          </div>
          <div style="text-align: center; font-weight: 600; font-size: 16px">TAX INVOICE</div>
          <div style="text-align: right; font-weight: 600">
            <div>Mob.: {{ companyInfo.mobile1 }}</div>
            <div>{{ companyInfo.mobile2 }}</div>
          </div>
        </div>

        <div style="text-align: right; font-size: 12px; padding: 4px 0">
          <div>Email: {{ companyInfo.email }}</div>
        </div>

        <!-- Company name & address -->
        <div style="border-top: 1px solid black; border-bottom: 1px solid black; padding: 4px 0; margin-bottom: 8px">
          <div style="text-align: center; font-weight: 800; font-size: 21px; letter-spacing: 0.05em">
            {{ companyInfo.name }}
          </div>
          <div style="text-align: center; font-size: 12px">
            {{ companyInfo.addressLine1 }}
          </div>
          <div style="text-align: center; font-size: 12px">
            {{ companyInfo.addressLine2 }}
          </div>
          <div style="text-align: center; font-size: 12px; font-weight: 600; margin-top: 4px; padding: 2px 0">
            MANUFACTURERS OF ALL KINDS OF EXPORT QUALITY HAND MADE PAPERS
          </div>
        </div>

        <!-- Bill meta -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 8px; font-size: 12px">
          <div>
            <span style="font-weight: 600">Bill No.</span>
            <span style="display: inline-block; border-bottom: 1px solid black; width: 128px; margin-left: 4px; padding-bottom: 5px">
              {{ invoice.invoiceNumber }}
            </span>
          </div>
          <div style="grid-column: span 2; text-align: right">
            <span style="font-weight: 600">Date :</span>
            <span
              style="
                display: inline-block;
                border-bottom: 1px solid black;
                width: 128px;
                margin-left: 4px;
                padding-bottom: 5px;
                text-align: right;
              "
            >
              {{ dayjs(invoice.invoiceDate).format("DD/MM/YYYY") }}
            </span>
          </div>
          <div style="grid-column: span 3">
            <span style="font-weight: 600">Purchaser&nbsp;:</span>
            <span style="display: inline-block; border-bottom: 1px solid black; width: 80%; margin-left: 4px; padding-bottom: 5px">
              {{ invoice.customerName }}
            </span>
          </div>
          <div style="grid-column: span 2">
            <span style="font-weight: 600">Address&nbsp;:</span>
            <span style="display: inline-block; border-bottom: 1px solid black; width: 80px; margin-left: 4px; padding-bottom: 5px">
              {{ invoice.address }}
            </span>
          </div>
          <div>
            <span style="font-weight: 600">State&nbsp;:</span>
            <span style="display: inline-block; border-bottom: 1px solid black; width: 112px; margin-left: 4px; padding-bottom: 5px">
              {{ invoice.state }}
            </span>
          </div>
          <div>
            <span style="font-weight: 600">GSTIN/UIN&nbsp;:</span>
            <span style="display: inline-block; border-bottom: 1px solid black; width: 112px; margin-left: 4px; padding-bottom: 5px">
              {{ invoice.gstNumber }}
            </span>
          </div>
        </div>

        <!-- Main items table -->
        <div style="border: 1px solid black; margin-bottom: 8px">
          <!-- Header for intrastate (CGST/SGST) -->
          <div
            v-if="isIntrastate"
            style="
              display: grid;
              grid-template-columns: 70px 2fr 50px 50px 50px 50px 50px 50px 50px;
              border-bottom: 1px solid black;
              font-size: 12px;
              font-weight: 600;
              text-align: center;
            "
          >
            <div style="border-right: 1px solid black; padding: 4px 0">Qty</div>
            <div style="border-right: 1px solid black; padding: 4px 0">DESCRIPTION OF GOODS</div>
            <div style="border-right: 1px solid black; padding: 4px 0">HSN</div>
            <div style="border-right: 1px solid black; padding: 4px 0">SIZE</div>
            <div style="border-right: 1px solid black; padding: 4px 0">WEIGHT</div>
            <div style="border-right: 1px solid black; padding: 4px 0">CGST %</div>
            <div style="border-right: 1px solid black; padding: 4px 0">SGST %</div>
            <div style="border-right: 1px solid black; padding: 4px 0">RATE</div>
            <div style="padding: 4px 0">AMOUNT</div>
          </div>

          <!-- Header for interstate (IGST) -->
          <div
            v-else
            style="
              display: grid;
              grid-template-columns: 70px 2fr 50px 50px 50px 50px 50px 50px;
              border-bottom: 1px solid black;
              font-size: 12px;
              font-weight: 600;
              text-align: center;
            "
          >
            <div style="border-right: 1px solid black; padding: 4px 0">Qty</div>
            <div style="border-right: 1px solid black; padding: 4px 0">DESCRIPTION OF GOODS</div>
            <div style="border-right: 1px solid black; padding: 4px 0">HSN</div>
            <div style="border-right: 1px solid black; padding: 4px 0">SIZE</div>
            <div style="border-right: 1px solid black; padding: 4px 0">WEIGHT</div>
            <div style="border-right: 1px solid black; padding: 4px 0">IGST %</div>
            <div style="border-right: 1px solid black; padding: 4px 0">RATE</div>
            <div style="padding: 4px 0">AMOUNT</div>
          </div>

          <!-- Rows for intrastate (CGST/SGST) -->
          <div
            v-if="isIntrastate"
            v-for="(item, idx) in invoice.products"
            :key="idx"
            style="display: grid; grid-template-columns: 70px 2fr 50px 50px 50px 50px 50px 50px 50px; font-size: 12px; min-height: 24px"
          >
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 0; text-align: center">
              {{ item.quantity }}
            </div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 4px">
              {{ item.product.productName }}
            </div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 4px">
              {{ item.product.HSN }}
            </div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 4px">
              {{ item.product.size }}
            </div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 4px">
              {{ item.product.weight }}
            </div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 0; text-align: center">
              {{ item.vat / 2 }}%
            </div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 0; text-align: center">
              {{ item.vat / 2 }}%
            </div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 0; text-align: center">
              ₹{{ item.price }}
            </div>
            <div style="border-bottom: 1px solid black; padding: 2px 0; text-align: center">
              ₹{{ (item.quantity * item.price).toFixed(2) }}
            </div>
          </div>

          <!-- Rows for interstate (IGST) -->
          <div
            v-else
            v-for="(item, idx) in invoice.products"
            style="display: grid; grid-template-columns: 70px 2fr 50px 50px 50px 50px 50px 50px; font-size: 12px; min-height: 24px"
          >
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 0; text-align: center">
              {{ item.quantity }}
            </div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 4px">
              {{ item.product.productName }}
            </div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 4px">
              {{ item.product.HSN }}
            </div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 4px">
              {{ item.product.size }}
            </div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 4px">
              {{ item.product.weight }}
            </div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 0; text-align: center">
              {{ item.vat }}%
            </div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black; padding: 2px 0; text-align: center">
              ₹{{ item.price }}
            </div>
            <div style="border-bottom: 1px solid black; padding: 2px 0; text-align: center">
              ₹{{ (item.quantity * item.price).toFixed(2) }}
            </div>
          </div>

          <!-- Empty rows for spacing (intrastate) -->
          <div
            v-if="isIntrastate"
            v-for="n in 3"
            :key="'empty-' + n"
            style="display: grid; grid-template-columns: 70px 2fr 50px 50px 50px 50px 50px 50px 50px; font-size: 12px; min-height: 20px"
          >
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-bottom: 1px solid black"></div>
          </div>

          <!-- Empty rows for spacing (interstate) -->
          <div
            v-else
            v-for="n in 3"
            :key="n"
            style="display: grid; grid-template-columns: 70px 2fr 50px 50px 50px 50px 50px 50px; font-size: 12px; min-height: 20px"
          >
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-right: 1px solid black; border-bottom: 1px solid black"></div>
            <div style="border-bottom: 1px solid black"></div>
          </div>
        </div>

        <!-- Totals section -->
        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 8px; font-size: 12px; margin-bottom: 8px">
          <!-- Left: Payment details -->
          <div style="border: 1px solid black; padding: 8px; font-size: 12px; line-height: 1.4">
            <div style="font-weight: 600"><span style="font-weight: 600">Bank:</span> {{ companyInfo.bank.name }}</div>
            <div><span style="font-weight: 600; margin-top: 4px">Bank A/C no:</span> {{ companyInfo.bank.accountNumber }}</div>
            <div><span style="font-weight: 600; margin-bottom: 2px">IFSC Code:</span> {{ companyInfo.bank.ifsc }}</div>

            <div style="margin-top: 12px">
              <div style="font-weight: 600; margin-bottom: 4px">Amount In Words:</div>
              <div style="min-height: 32px; border: 1px solid black; padding: 4px">
                {{ amountInWords }}
              </div>
            </div>
          </div>

          <!-- Right: totals -->
          <div style="border: 1px solid black">
            <div style="display: grid; grid-template-columns: 1fr 1fr; font-size: 12px">
              <div style="border-bottom: 1px solid black; padding: 2px 4px">Subtotal</div>
              <div style="border-bottom: 1px solid black; border-left: 1px solid black; padding: 5px 4px; text-align: right">
                ₹{{ calculateSubtotal.toFixed(2) }}
              </div>

              <!-- Intrastate taxes (CGST + SGST) -->
              <template v-if="isIntrastate">
                <div style="border-bottom: 1px solid black; padding: 2px 4px; padding-bottom: 5px">CGST</div>
                <div style="border-bottom: 1px solid black; border-left: 1px solid black; padding: 2px 10px; text-align: right">
                  ₹{{ (calculateTax / 2).toFixed(2) }}
                </div>

                <div style="border-bottom: 1px solid black; padding: 2px 4px; padding-bottom: 5px">SGST</div>
                <div style="border-bottom: 1px solid black; border-left: 1px solid black; padding: 2px 10px; text-align: right">
                  ₹{{ (calculateTax / 2).toFixed(2) }}
                </div>
              </template>

              <!-- Interstate tax (IGST) -->
              <template v-else>
                <div style="border-bottom: 1px solid black; padding: 2px 4px; padding-bottom: 5px">IGST</div>
                <div style="border-bottom: 1px solid black; border-left: 1px solid black; padding: 2px 10px; text-align: right">
                  ₹{{ calculateTax.toFixed(2) }}
                </div>
              </template>

              <div style="padding: 4px; font-weight: 700">Total Amount</div>
              <div style="border-left: 1px solid black; padding: 4px; text-align: right; font-weight: 700">₹{{ invoice.totalAmount }}</div>
            </div>
          </div>
        </div>

        <!-- Terms & signature -->
        <div style="border: 1px solid black; padding: 8px; font-size: 11px">
          <div style="font-weight: 600; margin-bottom: 4px">Terms &amp; Conditions :</div>
          <ol style="list-style: decimal; list-style-position: inside; margin-bottom: 8px; padding-left: 5px">
            <li>Goods Once Sold Will Not Be Taken Back.</li>
            <li>Always use wood FREE Hand Made Paper Product to save the Forest of the earth for our generations to come.</li>
            <li>Paper Being hand made 10% varation -ve or +ve shade texture thckness etc. will be exempted.</li>
          </ol>
          <div style="font-size: 11px; text-align: center; margin-bottom: 4px; padding: 2px 0">
            (ALL SUBJECT TO ORAI JURISDICTION) | Approved Unit by Khadi &amp; Village Industries Board, LUCKNOW
          </div>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 16px">
            <div style="font-size: 11px">
              Customer Signature
              <div style="border-top: 1px solid black; width: 128px; margin-top: 32px"></div>
            </div>
            <div style="text-align: right; font-size: 10px">
              <img src="../assets/stamp pshm.png" alt="Company Stamp" class="bottom-10 right-10 w-36 opacity-90 pointer-events-none" />
              For- <span style="font-weight: 600">{{ companyInfo.name }}</span>
              <div style="margin-top: 24px; border-top: 1px solid black; padding-top: 4px; font-size: 11px">Authorized Signatory</div>
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
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { invoiceService } from "../services/api";
import html2pdf from "html2pdf.js";
import dayjs from "dayjs";

const route = useRoute();
const router = useRouter();
const invoice = ref(null);
const loading = ref(false);

const isIntrastate = computed(() => {
  return invoice.value?.gstNumber?.startsWith("09");
});

const companyInfo = {
  name: "PARASAR HATH KAGAJ UDYOG",
  gstn: "09AAVPG6852F2Z7",
  tin: "09132902565",
  mobile1: "9005544680",
  mobile2: "9453525288",
  addressLine1: "Turnan Ganj, [124 Alampur]",
  addressLine2: "Kalpi-285204, Distt. Jalaun, U.P. India",
  email: "pshmpaper@gmail.com",
  bank: {
    name: "Canara Bank, kalpi (U.P.)",
    accountNumber: "125006223946 /120029568300",
    ifsc: "CNRB0018950",
  },
};
const calculateSubtotal = computed(() => {
  if (!invoice.value?.products) return 0;
  return invoice.value.products.reduce((sum, item) => sum + item.quantity * item.price, 0);
});

const calculateTax = computed(() => {
  if (!invoice.value?.products) return 0;
  return invoice.value.products.reduce((sum, item) => {
    const itemTotal = item.quantity * item.price;
    const tax = (itemTotal * (item.vat || 0)) / 100;
    return sum + tax;
  }, 0);
});

const amountInWords = computed(() => {
  if (!invoice.value) return "";
  const amount = parseFloat(invoice.value.totalAmount);
  return convertNumberToWords(amount);
});

const convertNumberToWords = (num) => {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

  if (num === 0) return "Zero Rupees Only";

  const convertLessThanThousand = (n) => {
    if (n === 0) return "";
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "");
    return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " " + convertLessThanThousand(n % 100) : "");
  };

  let wholePart = Math.floor(num);
  let result = "";

  if (wholePart >= 10000000) {
    result += convertLessThanThousand(Math.floor(wholePart / 10000000)) + " Crore ";
    wholePart %= 10000000;
  }
  if (wholePart >= 100000) {
    result += convertLessThanThousand(Math.floor(wholePart / 100000)) + " Lakh ";
    wholePart %= 100000;
  }
  if (wholePart >= 1000) {
    result += convertLessThanThousand(Math.floor(wholePart / 1000)) + " Thousand ";
    wholePart %= 1000;
  }
  if (wholePart > 0) {
    result += convertLessThanThousand(wholePart);
  }

  return result.trim() + " Rupees Only";
};

const downloadPdf = async () => {
  const filename = `Invoice_${invoice.value.invoiceNumber}_${invoice.value.customerName.replace(/\s+/g, "_")}.pdf`;
  const element = document.getElementById("invoice-content");

  const opt = {
    margin: 0.5,
    filename: filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 3, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  await html2pdf().set(opt).from(element).save();
};

const loadInvoice = async () => {
  loading.value = true;
  try {
    const response = await invoiceService.findOne(route.params.id);
    invoice.value = response.data;
  } catch (error) {
    console.error("Error loading invoice:", error);
    alert("Failed to load invoice");
  } finally {
    loading.value = false;
  }
};

onMounted(loadInvoice);
</script>

<style>
/* Keep print styles as fallback */
@media print {
  body * {
    visibility: hidden;
  }
  #invoice-content,
  #invoice-content * {
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
