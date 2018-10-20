<template>
    <doughnut-chart :prices="priceArray" :names="namesArray" />
</template>

<script>
import DoughnutChart from '@/components/DoughnutChart'
import { _BILLS } from '@/data'
import { getPricesArray, getNamesArray } from '@/utils'

export default {
    name: 'Chart',
    components: { DoughnutChart },
    data() {
        return {
            priceArray: [],
            namesArray: [],
        }
    },
    mounted() {
        this.bills = _BILLS;
        this.priceArray = getPricesArray(_BILLS)
        this.namesArray = getNamesArray(_BILLS)
    }
}
</script>

