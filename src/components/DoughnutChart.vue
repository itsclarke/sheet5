<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['prices', 'names'],
  data() {
    return {
      colors: []
    }
  },
  mounted () {
    this.prices.forEach(element => {
      let color = this.getRandomColor();
      this.colors.push(color);
    });

    this.renderChart({
      labels: this.names,
      datasets: [
        {
          data: this.prices,
          // backgroundColor: this.colors
        }
      ]
    })
  },
  methods: {
    getRandomColor: function() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
}

</script>
