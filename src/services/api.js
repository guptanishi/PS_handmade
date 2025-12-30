import axios from 'axios'

if (process.env.NODE_ENV == "production") {
	BASE_URL = 'https://ps-handmade.vercel.app';
} else {
	BASE_URL = 'http://localhost:3001';
}

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Products API
export const productService = {
  getAll: () => api.get('/products/'),
  create: (data) => api.post('/products/create', data),
  update: (id, data) => api.post(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getLastRecord: () => api.get('/products/lastRecord'),
  findOne: (id) => api.get(`/products/${id}`)
}

// Customers API
export const customerService = {
  getAll: () => api.get('/customers/'),
  create: (data) => api.post('/customers/create', data),
  update: (id, data) => api.post(`/customers/${id}`, data),
  delete: (id) => api.delete(`/customers/${id}`),
  getLastRecord: () => api.get('/customers/lastRecord'),
  findOne: (id) => api.get(`/customers/${id}`)
}

// Invoices API
export const invoiceService = {
  getAll: () => api.get('/invoices/'),
  create: (data) => api.post('/invoices/create', data),
  update: (id, data) => api.post(`/invoices/${id}`, data),
  delete: (id) => api.delete(`/invoices/${id}`),
  getLastRecord: () => api.get('/invoices/lastRecord'),
  findOne: (id) => api.get(`/invoices/${id}`)
}

// Cash Memos API
export const cashMemoService = {
  getAll: () => api.get('/cashMemos/'),
  create: (data) => api.post('/cashMemo/create', data),
  delete: (id) => api.delete(`/cashMemos/${id}`),
  getLastRecord: () => api.get('/cashMemo/lastRecord')
}
