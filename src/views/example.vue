<script setup>
import InvoiceParasar from "./InvoiceParasar.vue";

const exampleInvoice = {
  company: {
    gstn: "09AAVPG6852F2ZT",
    tin: "09132902565",
    mobile1: "9005544680",
    mobile2: "9453525288",
    addressLine1: "Turnan Ganj, [124 Alampur] Kalpi - 285 204, Distt. Jalaun (U.P.)",
    addressLine2: "",
  },
  billNo: "",
  date: "",
  purchaser: {
    name: "",
    stateCode: "",
    gstin: "",
  },
  items: [
    {
      qty: "",
      description: "HANDMADE PAPER",
      hsn: "",
      size: "",
      weight: "",
      rate: "",
      amount: "",
    },
  ],
  layout: { emptyRows: 5 },
  bank: {
    accountNo: "50077829695",
    ifsc: "IDIB000K542",
  },
  amountInWords: "",
  summary: {
    bundles: "",
    weight: "",
    orderNo: "",
    grNo: "",
    grDate: "",
  },
  totals: {
    discount: 0,
    taxableValue: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
    taxAmount: 0,
    totalAfterTax: 0,
    packing: 0,
    grossTotal: 0,
  },
};
</script>

<template>
  <InvoiceParasar :invoice="exampleInvoice" />
</template>
