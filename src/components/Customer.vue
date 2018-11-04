<template>
    <div>
        <label for="description">Описание:</label><br>
        <textarea id="description" v-model="description"></textarea>
        <hr>
        <label for="souce">Source:</label><br>
        <input id="souce" v-model="source" type="text"><br>
        <button @click="createCustomer">Создать</button>
    </div>
</template>

<script>
   export default {
      data() {
         return {
            source: '',
            description: ''
         }
      },

      methods: {
         createCustomer() {
            this.$store.dispatch('createCustomer', {
               source: this.source,
               description: this.description
            })

            this.source = ''
            this.description = ''
         }
      },
   }
</script>

<style scoped>

</style>