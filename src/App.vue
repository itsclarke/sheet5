<template>
  <div data-app>
    <header>
      <img src="@/assets/logo.png">
      <div class="summary">
        <div>Income: <span class="r">{{this.monthlyIncome | dollars}}</span></div>
        <div>Owed: <span class="r">{{this.total | dollars}}</span></div>
        <br>
        <div><strong>Remainder: <span class="r">{{this.remainingCash | dollars}}</span></strong></div>
      </div>
    </header>
    <div class="clearfix"></div>
    <div class="masthead"><h2>sheet 5</h2>{{this.now}}</div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/chart">Chart</router-link> | 
      <router-link to="/calendar">Calendar</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import moment from 'moment'
import numeral from 'numeral'
import { _BILLS } from '@/data'
import { calculateTotal, getPrices, getPricesArray, getNamesArray } from '@/utils'

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
    this.priceArray = getPricesArray(_BILLS)
    this.namesArray = getNamesArray(_BILLS)
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
  computed: {
    color() {
      console.log(this.type)
      return {
        color: this.type.owerd == true ? 'red' : 'green'
      }
    }
  }
}
</script>

<style lang="scss">
  #app {
    margin: 0 auto;
    width: 700px;

    th {
      border-bottom: solid 2px #333;
      text-align: left;
    }

    tr {
      td {
        padding: 3px 3px 3px 8px;
        border-left: solid 1px #333;
        border-bottom: solid 1px #333;
        height: 20px;

        &:first-child {
          border-left: none;
        }
      }
    }
  }

  h2 {
    padding-bottom: 0;
    margin-bottom: 0;
  }

  header {
    margin-top: 20px;

    img {
      width: 60px;
      height: auto;
      float: left;
    }

    .summary {
      float: right;
      vertical-align: bottom;
      width: 160px;
    }
  }

  .r {
    text-align: right;
    float: right;
  }

  .masthead {
    text-align: center;
    margin: 20px 0 40px;
  }

  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
</style>

