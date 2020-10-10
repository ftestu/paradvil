<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        Paradvil Stimulation
      </h1>
    </div>
    <div class="chooseGraph">
      <span>Choose you type of graph:</span>
      <button class="chooseGraphButton" @click="setArea">
        Line
      </button>
      <button class="chooseGraphButton" @click="setBar">
        Bar
      </button>
    </div>
    <div class="interface">
      <div class="dropdown">
        <span class="title-dropdown">Hepatic: </span>
        <label for="dropdown" /><select id="dropdown" v-model="selected" class="drop">
          <option v-for="option in listHepatic" :key="option.id">
            {{ option }}
          </option>
        </select>
        <div>
          <button class="button-simulate" @click="updateValue">
            Click Me!
          </button>
        </div>
      </div>
      <div class="graph">
        <AreaChart
          v-if="isArea === true"
          ref="areaChart"
          :data-title="'Paradvil: concentrations'"
          :data-labels="dataLabels"
          :data-value="dataValue"
        />
        <BarChart
          v-if="isBar === true"
          ref="areaChart"
          :data-title="'Paradvil: concentrations'"
          :data-labels="dataLabels"
          :data-value="dataValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/BarChart'
import AreaChart from '@/components/AreaChart.vue'
import Logo from '@/components/Logo'

export default {
  components: {
    BarChart,
    AreaChart,
    Logo
  },
  async asyncData ({ $http }) {
    const list = await $http.$get('/api/init')
    return {
      listHepatic: list
    }
  },
  data () {
    return {
      selected: '',
      test: null,
      isSubmit: false,
      isGraph: {},
      dataLabels: [],
      dataValue: [],
      isBar: false,
      isArea: true
    }
  },
  methods: {
    async updateValue () {
      this.$store.commit('SET_ISCLICKED')
      this.test = await this.$http.post('/api/updateSelected', { selectedHepatic: this.selected })
      this.getData()
      this.getLabels()
    },
    getLabels () {
      fetch('/api/getLabels')
        .then(response => response.json())
        .then((result) => {
          this.dataLabels = result
          this.$store.commit('SET_LABELS', result)
        })
    },
    getData () {
      fetch('/api/getData')
        .then(response => response.json())
        .then((result) => {
          this.dataValue = result
          this.$store.commit('SET_VALUE', result)
        })
    },
    setArea () {
      this.isArea = true
      this.isBar = false
    },
    setBar () {
      this.isArea = false
      this.isBar = true
    }
  }
}
</script>

<style>

.chooseGraph {
  text-align: center;
  margin-top: 50px;
}

.chooseGraphButton {
  color: #35495e;
  padding: 20px;
  text-align: center;
  font-size: 16px;
  margin: 20px 20px;
  cursor: pointer;
  border-radius: 12px;
  background: #FFC733;
  border: solid 1px transparent;
}

.interface {
  height: 100%;
  display: flex;
  margin-top: 50px;
}

.dropdown {
  width: 35%;
  display: table-cell;
  position: center;
}

.graph {
  margin-right: 30px;
  flex-grow: 2;
  width: 100%;
}

.drop {
  height: 10%;
  font-family: 'Quicksand',
  -apple-system,
  BlinkMacSystemFont,
  Roboto,
  Arial,
  sans-serif;
  font-size: 20px;
}

.container {
  margin: 0 auto;
  min-height: 100vh;

}

.title {
  font-family: 'Quicksand',
  -apple-system,
  BlinkMacSystemFont,
  Roboto,
  Arial,
  sans-serif;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title-dropdown {
  color: #35495e;
  font-weight: 100;
  font-size: 40px;
}

.dropdown {
  position: relative;
  display: inline-block;
  margin-left: 30px;
  margin-top: 30px;
}

.button-simulate {
  display: inline-block;
  text-align: center;
  text-decoration: none;
  color: #35495e;
  padding: 20px;
  font-size: 16px;
  margin: 20px 20px;
  cursor: pointer;
  border-radius: 12px;
  background: #FFC733;
  border: solid 1px transparent;
}

.button-simulate:hover {
  color: #35495e;
  border-color: currentColor;
  background-color: white;
}

.button-simulate:focus {
  outline: none;
  box-shadow: 0 0 0 3px #FFC733,
  0 0 0 2px #FFC733;
}

.js-focus-visible .button-simulate:focus:not(.focus-visible) {
  box-shadow: none;
}

</style>
