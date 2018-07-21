import Vue from 'vue'

export const state = () => ({
  title: 'Sample project',
  controls: {
    hasControls: true,
    hasBorders: true,
    hasRotatingPoint: false,
    visible: true,
    selectable: true,
    evented: true,
    centeredScaling: true,
    centeredRotation: true,
    cornerStyle: 'circle',
    transparentCorners: false,
    padding: 5,
    cornerSize: 10,
    rotatingPointOffset: 20,
    borderColor: '#4096f7',
    cornerColor: '#ffffff',
    cornerStrokeColor: '#ff2500',
    _controlsVisibility: {
      bl: true,
      br: true,
      mb: false,
      ml: false,
      mr: false,
      mt: false,
      mtr: false,
      tl: true,
      tr: true
    }
  }
})

export const getters = {}

export const mutations = {
  changeTitle(state, data) {
    state.title = data
  },
  changeWidgetControlsDetails(state, data) {
    console.log(state, data)
    state.controls.hasRotatingPoint = data.hasRotatingPoint
    state.controls.borderColor = data.borderColor
    state.controls.cornerColor = data.cornerColor
    state.controls.cornerStrokeColor = data.cornerStrokeColor
    state.controls._controlsVisibility = data._controlsVisibility
    console.log(state, data)
  }
}

export const actions = {}
