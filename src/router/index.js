import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../views/HomePage.vue'
import ProductList from '../views/ProductList.vue'
import CreateProduct from '../views/CreateProduct.vue'
import UpdateProduct from '../views/UpdateProduct.vue'
import CustomersList from '../views/CustomersList.vue'
import CreateCustomer from '../views/CreateCustomer.vue'
import UpdateCustomer from '../views/UpdateCustomer.vue'
import TaxInvoiceForm from '../views/TaxInvoiceForm.vue'
import InvoicesList from '../views/InvoicesList.vue'
import PdfGenerator from '../views/PdfGenerator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/products',
      name: 'products',
      component: ProductList
    },
    {
      path: '/products/create',
      name: 'createProduct',
      component: CreateProduct
    },
    {
      path: '/products/update/:id',
      name: 'updateProduct',
      component: UpdateProduct,
      props: true
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomersList
    },
    {
      path: '/customers/create',
      name: 'createCustomer',
      component: CreateCustomer
    },
    {
      path: '/customers/update/:id',
      name: 'updateCustomer',
      component: UpdateCustomer,
      props: true
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: InvoicesList
    },
    {
      path: '/invoices/create',
      name: 'createInvoice',
      component: TaxInvoiceForm,
      props: true
    },
    {
      path: '/pdf/:id',
      name: 'pdfGenerator',
      component: PdfGenerator,
      props: true
    }
  ]
})

export default router
