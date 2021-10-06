<script>
import { Doughnut } from 'vue-chartjs'
import { mapState } from "vuex";

export default {
  extends: Doughnut,
  data: () => ({
    chartdata: {
      datacollection: {
        labels: ['食料', '家電製品', '粧工品', '生活雑貨', '書籍', 'その他'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#FF6384','#36A2EB'],
            data: [30, 10, 20, 20, 5, 15]
          }
        ]
      }
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartdata['datacollection'], this.options)
  }
}


</script>