<template>
  <div id="app">
    <header>
      <img src="@/assets/logo.png">
      <div class="right">
        <div>Income: {{this.monthlyIncome | dollars}}</div>
        <div>Owed: {{this.total | dollars}}</div>
        <br>
        <div><strong>Remainder: {{this.remainingCash | dollars}}</strong></div>
      </div>
    </header>
    <div class="clearfix"></div>
    <div class="masthead"><h2>sheet 5</h2>{{this.now}}</div>
    <v-data-table :items="bills" :headers="headers" :rows-per-page-items="[50]">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.price | dollars}}</td>
        <td>{{ props.item.dueDate | dueDate}}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment'
import numeral from 'numeral'
import { _BILLS } from '@/data'
import { calculateTotal, getPrices } from '@/utils'

export default {
  name: 'S5',
  data() {
    return {
      bills: [],
      total: 0,
      prices: [],
      monthlyIncome: 0,
      remainingCash: 0,
      now: moment().format('MMMM Do YYYY'),
    }
  },
  mounted() {
    this.bills = _BILLS;
    this.total = calculateTotal(_BILLS)
    this.prices = getPrices(_BILLS)
    this.monthlyIncome = this.getIncome()
    this.remainingCash = this.getRemainder()
  },
  methods: {
    getIncome: function() {
      return 2310.69 * 2
    },
    getRemainder: function() {
      return this.monthlyIncome - this.prices
    }
  },
  filters: {
    prettyDate: function(date) {
      return moment(date).format('LLLL')
    },
    dollars: function(price) {
      return numeral(price).format('$0,0.00')
    },
    dueDate: function(date) {
      let today = new Date()
      let day = (date.length) ? date[0] : date
      return moment(today.setDate(day)).format(`Do`)
    }
  }
}
</script>

<style lang="scss">
</style>

