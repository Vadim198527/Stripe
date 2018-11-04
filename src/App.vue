<template>
    <div>
        <app-add-customer></app-add-customer>
        <app-list-customers></app-list-customers>
    </div>
</template>

<script>

   import Customer from './components/Customer'
   import ListCustomer from './components/ListCustomer'

   export default {
      components: {
         AppAddCustomer: Customer,
         AppListCustomers: ListCustomer
      }
   }
</script>

<style>


</style>
