<template>
    <div>
      <form>
        <input type="text" name="" id="" placeholder="add new bill" style="border: solid 1px black">
        <button type="submit" style="border: solid 1px black">Add bill</button>
      </form>
        <v-data-table :items="bills" :headers="headers" :rows-per-page-items="[50]">
        <template slot="items" slot-scope="props">
            <td>{{props.item.name}}</td>
            <td>{{props.item.price | dollars}}</td>
            <td>{{props.item.dueDate | dueDate}}</td>
        </template>
        </v-data-table>
    </div>
</template>

<script>
import moment from 'moment'
import numeral from 'numeral'
import { _BILLS } from '@/data'
import { calculateTotal, getPrices, getPricesArray, getNamesArray } from '@/utils'

export default {
    name: 'Home',
    data() {
        return {
            bills: [],
            total: 0,
            prices: [],
            monthlyIncome: 0,
            remainingCash: 0,
            now: moment().format('MMMM Do YYYY'),
            headers: [
                {
                text: 'Name',
                align: 'left',
                value: 'name'
                },
                { text: 'Cost', value: 'price' },
                { text: 'Due Date', value: 'dueDate' }
            ]
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
        },
        classColor: function(bill) {
            return bill.type.owed === true 
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
    },
}
</script>
