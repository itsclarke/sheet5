<template>
    <div>
      <v-form ref="form">
        <label for="">Add a new bill</label>
        <v-text-field v-model="bill.name" placeholder="add new bill"></v-text-field>
        <v-text-field v-model="bill.price" placeholder="price"></v-text-field>
        <v-text-field v-model="bill.dueDate" type="date" placeholder="due date"></v-text-field>
        <v-select name="" id="" :items="this.bills"></v-select>
        <label for="">Owed</label>
        <v-checkbox type="checkbox" name="" id=""></v-checkbox>
        <v-btn @click="submit">Add bill</v-btn>
      </v-form>
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
import { mapState } from 'vuex'
import { _BILLS } from '@/data'
import { calculateTotal, getPrices } from '@/utils'

export default {
    name: 'Home',
    computed: mapState({
        bill: state => state.bill,
        bills: state => state.bills,
        total: state => state.total
    }),
    data() {
        return {
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
        this.$store.commit('updateBills', _BILLS)
        this.$store.total = calculateTotal(_BILLS)
        this.prices = getPrices(_BILLS)
        this.monthlyIncome = this.getIncome()
        this.remainingCash = this.getRemainder()
    },
    methods: {
        submit: function() {
            if (this.$refs.form.validate()) {
                this.$store.commit('addBill', this.bill)
            }
        },
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
    },
}
</script>

<style lang="scss" scoped>
    input {
        display: block;
    }
</style>
