export const customers = {
   state: {
      customers: []
   },

   getters: {
      customers(state) {
         return state.customers
      },

   },

   mutations: {

      loadCustomers(state, payload) {
         state.customers = payload
      }
   },

   actions: {
      async createCustomer({dispatch}, payload) {
         const http = new XMLHttpRequest()
         http.open('POST', 'https://api.stripe.com/v1/customers', false)
         http.setRequestHeader('Authorization', 'Bearer sk_test_5acQr9LCESedXrO6Qb5bbBlx')
         http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
         const body = `description=${payload.description}&source=${payload.source}`
         await http.send(body)
         dispatch('loadCustomers')
      },

      async loadCustomers({commit}) {
         const http = new XMLHttpRequest()
         http.open('GET', 'https://api.stripe.com/v1/customers', false)
         http.setRequestHeader('Authorization', 'Bearer sk_test_5acQr9LCESedXrO6Qb5bbBlx')
         http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
         await http.send()
         const customers = await JSON.parse(http.responseText).data
         commit('loadCustomers', customers)
      },

      async updateResults({dispatch}, payload) {
         let request = ''
         request = payload.email ? `${request}email=${payload.email}` : request
         request = payload.description ? `${request}&description=${payload.description}` : request
         const http = new XMLHttpRequest()
         http.open('POST', `https://api.stripe.com/v1/customers/${payload.id}`, false)
         http.setRequestHeader('Authorization', 'Bearer sk_test_5acQr9LCESedXrO6Qb5bbBlx')
         http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
         await http.send(request)
         dispatch('loadCustomers')
      },

      async deleteCustomer({dispatch}, payload) {
         const http = new XMLHttpRequest()
         http.open('DELETE', `https://api.stripe.com/v1/customers/${payload.id}`, false)
         http.setRequestHeader('Authorization', 'Bearer sk_test_5acQr9LCESedXrO6Qb5bbBlx')
         http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
         await http.send()
         dispatch('loadCustomers')
      }
   }
}