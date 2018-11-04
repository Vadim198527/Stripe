<template>
    <div>
        <table>
            <tr>
                <th>Id</th>
                <th>Created</th>
                <th>Email</th>
                <th>Description</th>
                <th>VAT number</th>
                <th>Address</th>
                <th>Phone number</th>
                <th>Invoice prefix</th>
            </tr>
            <tr :key="index" v-for="(customer, index) in customers">
                <td>{{customer.id}}</td>
                <td>{{new Date(customer.created * 1000).toLocaleString()}}</td>

                <td v-if="editingStringNumber !== index">{{customer.email}}</td>
                <td v-else>
                    <input
                            type="text"
                            :value=customer.email
                            name="email"
                            @change="onChange($event)"
                    >
                </td>

                <td v-if="editingStringNumber !== index">{{customer.description}}</td>
                <td v-else>
                    <input
                            type="text"
                            :value=customer.description
                            name="description"
                            @change="onChange($event)"
                    >
                </td>

                <td>{{customer.tax_info ? customer.tax_info.tax_id : ''}}</td>
                <td>{{getAdress(customer)}}</td>

                <td>{{getPhone(customer)}}</td>

                <td>{{customer.invoice_prefix}}</td>
                <td>
                    <button v-if="editingStringNumber !== index" @click="onClick(index)">Редактировать</button>
                    <button v-else @click="updateResults(index)">Сохранить</button>
                </td>
                <td>
                    <button @click="deleteCustomer(index)">Удалить</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>

   export default {
      data() {
         return {
            editingStringNumber: -1,
            email: '',
            description: ''
         }
      },

      computed: {

         customers() {
            return this.$store.getters['customers']
         }
      },

      created() {
         this.$store.dispatch('loadCustomers')
      },

      methods: {
         onClick(index) {
            this.editingStringNumber = index
         },

         updateResults(index) {
            const customer = this.customers[index]
            const id = customer.id
            const changes = {id}
            const email = this.email
            if (email !== customer.email) {
               changes['email'] = email
            }
            const description = this.description
            if (description !== customer.description) {
               changes['description'] = description
            }

            if (changes['email'] || changes['description']) {
               this.$store.dispatch('updateResults', changes)
            }

            this.email = ''
            this.description = ''
            this.editingStringNumber = -1
         },

         deleteCustomer(index) {
            const id = this.customers[index].id
            this.$store.dispatch('deleteCustomer', {id})
         },

         onChange(event) {
            const value = event.target.value
            const name = event.target.name
            switch (name) {
               case 'email':
                  this.email = value
                  return
               case 'description':
                  this.description = value
                  return
            }
         },
         getAdress(customer) {
            if (customer.shipping) {
               const address = `${customer.shipping.address.country}/${customer.shipping.address.city}`
               return address
            }
            return ''
         },

         getPhone(customer) {
            if (customer.shipping) {
               const address = customer.shipping.phone
               return address
            }
            return ''
         },
      }
   }
</script>

<style scoped>
    table {
        margin: 20px;
        border-collapse: collapse;
    }

    table, th, td {
        padding: 5px;
        border: 1px solid black;
    }
</style>