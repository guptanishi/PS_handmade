<!-- InvoiceParasar.vue -->
<template>
  <div class="bg-gray-100 p-6">
    <!-- A4-ish container -->
    <div
      class="mx-auto bg-white border border-red-600 p-4 text-[11px] leading-tight max-w-[800px]"
    >
      <!-- Top row: GSTN / TIN / Phone -->
      <div class="flex justify-between text-[10px] mb-1">
        <div>
          <div>GSTN : {{ invoice.company.gstn }}</div>
          <div>TIN No. : {{ invoice.company.tin }}</div>
        </div>
        <div class="text-center font-semibold">
          TAX INVOICE
        </div>
        <div class="text-right">
          <div>Mob.: {{ invoice.company.mobile1 }}</div>
          <div>{{ invoice.company.mobile2 }}</div>
        </div>
      </div>

      <div class="text-[9px] text-center mb-1">
        (ALL SUBJECT TO ORAI JURISDICTION) |
        Approved Unit by Khadi &amp; Village Industries Board, LUCKNOW
      </div>

      <!-- Company name & address -->
      <div class="border-y border-red-600 py-1 mb-2">
        <div class="text-center font-extrabold text-lg tracking-wide">
          PARASAR HATH KAGAZ UDYOG
        </div>
        <div class="text-center text-[10px]">
          {{ invoice.company.addressLine1 }}
        </div>
        <div class="text-center text-[10px]">
          {{ invoice.company.addressLine2 }}
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
            {{ invoice.billNo }}
          </span>
        </div>
        <div class="col-span-2 text-right">
          <span class="font-semibold">Date :</span>
          <span class="inline-block border-b border-red-600 w-32 ml-1 text-right">
            {{ invoice.date }}
          </span>
        </div>
        <div class="col-span-3">
          <span class="font-semibold">Purchaser&nbsp;:</span>
          <span class="inline-block border-b border-red-600 w-[80%] ml-1">
            {{ invoice.purchaser.name }}
          </span>
        </div>
        <div class="col-span-2">
          <span class="font-semibold">State Code&nbsp;:</span>
          <span class="inline-block border-b border-red-600 w-20 ml-1">
            {{ invoice.purchaser.stateCode }}
          </span>
        </div>
        <div>
          <span class="font-semibold">GSTIN/UIN&nbsp;:</span>
          <span class="inline-block border-b border-red-600 w-28 ml-1">
            {{ invoice.purchaser.gstin }}
          </span>
        </div>
      </div>

      <!-- Main items table -->
      <div class="border border-red-600 mb-2">
        <!-- Header -->
        <div class="grid grid-cols-[40px_1.6fr_90px_80px_80px_80px_90px] border-b border-red-600 text-[10px] font-semibold text-center">
          <div class="border-r border-red-600 py-1">Qty</div>
          <div class="border-r border-red-600 py-1">DESCRIPTION OF GOODS</div>
          <div class="border-r border-red-600 py-1">HSN CODE</div>
          <div class="border-r border-red-600 py-1">SIZE</div>
          <div class="border-r border-red-600 py-1">WEIGHT</div>
          <div class="border-r border-red-600 py-1">RATE</div>
          <div class="py-1">AMOUNT</div>
        </div>

        <!-- Rows -->
        <div
          v-for="(item, idx) in invoice.items"
          :key="idx"
          class="grid grid-cols-[40px_1.6fr_90px_80px_80px_80px_90px] text-[10px] min-h-[24px]"
        >
          <div class="border-r border-red-600 border-b py-0.5 text-center">
            {{ item.qty }}
          </div>
          <div class="border-r border-red-600 border-b py-0.5 px-1">
            {{ item.description }}
          </div>
          <div class="border-r border-red-600 border-b py-0.5 text-center">
            {{ item.hsn }}
          </div>
          <div class="border-r border-red-600 border-b py-0.5 text-center">
            {{ item.size }}
          </div>
          <div class="border-r border-red-600 border-b py-0.5 text-center">
            {{ item.weight }}
          </div>
          <div class="border-r border-red-600 border-b py-0.5 text-center">
            {{ formatCurrency(item.rate) }}
          </div>
          <div class="border-b py-0.5 text-center">
            {{ formatCurrency(item.amount) }}
          </div>
        </div>

        <!-- A few empty rows for print look -->
        <div
          v-for="n in invoice.layout.emptyRows"
          :key="'empty-' + n"
          class="grid grid-cols-[40px_1.6fr_90px_80px_80px_80px_90px] text-[10px] min-h-[20px]"
        >
          <div class="border-r border-red-600 border-b"></div>
          <div class="border-r border-red-600 border-b"></div>
          <div class="border-r border-red-600 border-b"></div>
          <div class="border-r border-red-600 border-b"></div>
          <div class="border-r border-red-600 border-b"></div>
          <div class="border-r border-red-600 border-b"></div>
          <div class="border-b"></div>
        </div>
      </div>

      <!-- Bank and totals section -->
      <div class="grid grid-cols-[1.2fr_0.8fr] gap-2 text-[10px] mb-2">
        <!-- Left: Bank details & bundles -->
        <div class="border border-red-600 p-1">
          <div class="font-semibold mb-1">Bank - Indian Bank, Mandi Branch, Kalpi</div>
          <div>Bank A/C No. {{ invoice.bank.accountNo }}</div>
          <div>IFSC CODE : {{ invoice.bank.ifsc }}</div>

          <div class="mt-3">
            <div class="font-semibold mb-1">Rs. (In Words)</div>
            <div class="min-h-[32px] border border-red-600 p-1">
              {{ invoice.amountInWords }}
            </div>
          </div>

          <div class="grid grid-cols-2 gap-x-2 mt-2">
            <div>
              <div>No. of Bundles</div>
              <div class="border-b border-red-600 h-4">
                {{ invoice.summary.bundles }}
              </div>
            </div>
            <div>
              <div>Weight</div>
              <div class="border-b border-red-600 h-4">
                {{ invoice.summary.weight }}
              </div>
            </div>
            <div class="col-span-2 mt-1">
              <div>Order No.</div>
              <div class="border-b border-red-600 h-4">
                {{ invoice.summary.orderNo }}
              </div>
            </div>
            <div>
              <div>G.R./R.R. No.</div>
              <div class="border-b border-red-600 h-4">
                {{ invoice.summary.grNo }}
              </div>
            </div>
            <div>
              <div>Date</div>
              <div class="border-b border-red-600 h-4">
                {{ invoice.summary.grDate }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right: taxes -->
        <div class="border border-red-600">
          <div class="grid grid-cols-2 text-[10px]">
            <div class="border-b border-red-600 px-1 py-0.5">
              Less Discount -
            </div>
            <div class="border-b border-l border-red-600 px-1 py-0.5 text-right">
              {{ formatCurrency(invoice.totals.discount) }}
            </div>

            <div class="border-b border-red-600 px-1 py-0.5">
              Taxable Value
            </div>
            <div class="border-b border-l border-red-600 px-1 py-0.5 text-right">
              {{ formatCurrency(invoice.totals.taxableValue) }}
            </div>

            <div class="border-b border-red-600 px-1 py-0.5">
              Add CGST
            </div>
            <div class="border-b border-l border-red-600 px-1 py-0.5 text-right">
              {{ formatCurrency(invoice.totals.cgst) }}
            </div>

            <div class="border-b border-red-600 px-1 py-0.5">
              Add SGST
            </div>
            <div class="border-b border-l border-red-600 px-1 py-0.5 text-right">
              {{ formatCurrency(invoice.totals.sgst) }}
            </div>

            <div class="border-b border-red-600 px-1 py-0.5">
              Add IGST
            </div>
            <div class="border-b border-l border-red-600 px-1 py-0.5 text-right">
              {{ formatCurrency(invoice.totals.igst) }}
            </div>

            <div class="border-b border-red-600 px-1 py-0.5 font-semibold">
              Tax Amount : GST
            </div>
            <div class="border-b border-l border-red-600 px-1 py-0.5 text-right">
              {{ formatCurrency(invoice.totals.taxAmount) }}
            </div>

            <div class="border-b border-red-600 px-1 py-0.5 font-semibold">
              Total Amount After Tax
            </div>
            <div class="border-b border-l border-red-600 px-1 py-0.5 text-right">
              {{ formatCurrency(invoice.totals.totalAfterTax) }}
            </div>

            <div class="border-b border-red-600 px-1 py-0.5">
              Fow. &amp; Pack. Charge
            </div>
            <div class="border-b border-l border-red-600 px-1 py-0.5 text-right">
              {{ formatCurrency(invoice.totals.packing) }}
            </div>

            <div class="px-1 py-1 font-bold">
              Gross Total Rs.
            </div>
            <div class="border-l border-red-600 px-1 py-1 text-right font-bold">
              {{ formatCurrency(invoice.totals.grossTotal) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Terms & signature -->
      <div class="border border-red-600 p-2 text-[9px]">
        <div class="font-semibold mb-1">Terms &amp; Conditions :</div>
        <ol class="list-decimal list-inside space-y-0.5 mb-2">
          <li>Goods Once Sold Will Not Be Taken Back.</li>
          <li>
            Always Use GOOD FREE Hand Made Paper Product To Save
            The Forest Of The Earth For Our Generation To Come.
          </li>
          <li>
            Paper Being Hand Made 100% Variation -1% Or +1% Shade
            Texture Thickness Etc. Will Be Exempted.
          </li>
        </ol>

        <div class="flex justify-between items-end mt-2">
          <div>
            <div class="text-[9px] mb-1">
              Tax is Payable On Reverse Charge:
              <span class="ml-2">
                <input type="checkbox" class="align-middle" />
                Yes
              </span>
              <span class="ml-3">
                <input type="checkbox" class="align-middle" />
                No
              </span>
            </div>
          </div>
          <div class="text-right text-[10px]">
            For- <span class="font-semibold">PARASAR HATH KAGAZ UDYOG</span>
            <div class="mt-6 border-t border-red-600 pt-1 text-[9px]">
              Auth Signatory
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  invoice: {
    type: Object,
    required: true,
  },
});

const formatCurrency = (value) =>
  value === null || value === undefined
    ? ""
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
      }).format(value);
</script>
