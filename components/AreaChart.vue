<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: [
    // eslint-disable-next-line vue/prop-name-casing,vue/require-prop-types
    'data-labels',
    // eslint-disable-next-line vue/prop-name-casing,vue/require-prop-types
    'data-value',
    // eslint-disable-next-line vue/prop-name-casing,vue/require-prop-types
    'data-title'
  ],
  data () {
    return {
      gradient: null,
      gradient2: null
    }
  },
  computed: {
    updateDataLabels () {
      return this.dataLabels
    },
    updateDataValue () {
      return this.dataValue
    },
    updateDataTitle () {
      return this.dataTitle
    }
  },
  watch: {
    dataLabels () {
      this.renderLineChart()
    }
  },
  mounted () {
    this.renderLineChart()
  },
  methods: {
    renderLineChart () {
      const dataValue = this.updateDataValue
      const dataLabels = this.updateDataLabels
      const dataTitle = this.updateDataTitle

      this.gradient = this.$refs.canvas
        .getContext('2d')
        .createLinearGradient(0, 0, 0, 450)
      this.gradient2 = this.$refs.canvas
        .getContext('2d')
        .createLinearGradient(0, 0, 0, 450)

      this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
      this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)')
      this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)')

      this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
      this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)')
      this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)')

      this.renderChart(
        {
          labels: dataLabels,
          datasets: [
            {
              label: dataTitle,
              backgroundColor: this.gradient,
              data: dataValue
            }
          ]
        },
        {
          responsive: true,
          maintainAspectRatio: false
        }
      )
    }
  }
}
</script>
