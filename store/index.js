export const state = () => ({
  title: 'Sample project',
  canvasWidth: 700,
  canvasHeight: 400,
  hasDetailsControls: false,
  widgetsCounter: 0,
  await: false,
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
    isSelectable: false,
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
    state.controls.hasRotatingPoint = data.hasRotatingPoint
    state.controls.borderColor = data.borderColor
    state.controls.cornerColor = data.cornerColor
    state.controls.cornerStrokeColor = data.cornerStrokeColor
    state.controls._controlsVisibility = data._controlsVisibility
    state.hasDetailsControls = data.hasDetailsControls
  },
  awaitStart(state) {
    state.await = true
  },
  awaitEnd(state) {
    state.await = false
  },
  increaseWidgetsCounter(state) {
    state.widgetsCounter++
  },
  decreaseWidgetsCounter(state) {
    state.widgetsCounter--
  }
}

export const actions = {}
