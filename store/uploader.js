export const state = () => ({
  uploader: {
    showModal: false,
    base64: '',
    cropp: {}
  }
})

export const mutations = {
  openModal(state) {
    state.uploader.showModal = true
  },
  closeModal(state) {
    state.uploader.showModal = false
    state.uploader.cropp = {}
  },
  setImage(state, data) {
    state.uploader.base64 = data
  }
}