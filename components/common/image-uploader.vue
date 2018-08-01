<template>
  <el-dialog
          id="profileAvatarModal"
          :visible="uploader.showModal"
          v-if="uploader.showModal"
          :show-close="false"
          :show-title="false"
          :before-close="handleClose"
          custom-class="profile-data-avatar"
          width="900px">
    <div class="profile-data-container">
      <h1 class="modal-title">Update picture</h1>
      <div class="select-image-area" v-if="imgSrc === ''">
        <label class="selector-label" for="file-selector">
          Select image from your device
          <input type="file" id="file-selector" name="image" accept="image/*"
                 style="display: none"
                 @change="setImage"/>
        </label>
      </div>
      <div class="cropp-image-area ta-center" v-if="imgSrc !== ''">
        <vue-cropper
                ref='cropper'
                :guides="false"
                :view-mode="2"
                drag-mode="crop"
                :auto-crop-area="0.5"
                :min-container-width="50"
                :min-container-height="50"
                :background="true"
                :rotatable="false"
                :src="imgSrc"
                alt="Source Image"
                :img-style="{ 'width': '100%', 'max-height': '550px' }"/>
        <div class="controls-area">
          <el-button @click="cropImage" :disabled="imgSrc === ''" type="success">Upload</el-button>
          <el-button @click="imgSrc = ''" type="info">Clear</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import {mapState} from 'vuex'
  import VueCropper from 'vue-cropperjs'

  export default {
    name: 'widgetImage',
    components: {
      VueCropper,
    },
    data() {
      return {
        imgSrc: '',
        cropImg: ''
      }
    },
    computed: {
      ...mapState('uploader', ['uploader'])
    },
    methods: {
      handleClose() {
        this.$store.commit('uploader/closeModal')
      },
      setImage(e) {
        const file = e.target.files[0]
        if (!file.type.includes('image/')) {
          alert('Please select an image file')
          return
        }
        if (typeof FileReader === 'function') {
          const reader = new FileReader()
          reader.onload = (event) => {
            this.imgSrc = event.target.result
            // rebuild cropperjs with the updated source
            this.$refs.cropper.replace(event.target.result)
          }
          reader.readAsDataURL(file)
        } else {
          alert('Sorry, FileReader API not supported')
        }
      },
      cropImage() {
        // get image data for post processing, e.g. upload or setting image src
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
        //TODO push new avatar to backend
        this.$root.$emit('UPLOADED_IMAGE_READY', this.cropImg)
        this.imgSrc = ''
        this.$store.commit('uploader/closeModal')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .select-image-area
    display flex
    width 100%
    height 300px
    max-height 550px
    align-content center
    justify-content center
    .selector-label
      font 16px/300px 'Tahoma'
      color #000000
      display flex
      width 100%
      height 300px
      align-content center
      justify-content center
      margin 0
    &:hover
      .selector-label
        background #d7f4fc
        cursor pointer



</style>
