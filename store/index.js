export const state = () => ({
  isClicked: false,
  dataLabels: [],
  dataValue: []
})

export const mutations = {
  SET_ISCLICKED (state) {
    state.isClicked = !state.isClicked
  },
  SET_LABELS (state, data) {
    state.dataLabels = data
  },
  SET_VALUE (state, data) {
    state.dataValue = data
  }
}
