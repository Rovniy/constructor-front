<template>
  <div id="custom-canvas" class="customization-form customization-area">
    <el-form ref="form" :model="form" label-width="100">
      <el-row>
        <label>Project name</label>
        <el-input v-model="title" @change="changeTitle"/>
      </el-row>
      <el-row>
        <label>Background color</label>
        <el-button-group>
          <el-color-picker v-model="form.backgroundColor"
                           show-alpha
                           color-format="rgba"
                           :predefine="predefineColors"
                           @active-change="setCanvasBackground"></el-color-picker>
          <el-button size="small" type="success" @click="setBackgroundImage">Image</el-button>
          <el-button size="small" type="danger" @click="resetBackgroundColor">Reset</el-button>
        </el-button-group>
      </el-row>
      <el-form-item label="Details controls">
        <el-switch v-model="detailsWidgetControls"
                   active-color="#13ce66"
                   inactive-color="#ff4949"
                   @change="changeWidgetControlsDetails"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'customCanvas',
    data() {
      return {
        form: {
          backgroundColor: '#ffffff'
        },
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff'
        ],
        title: this.$store.state.title,
        detailsWidgetControls: false
      }
    },
    methods: {
      setCanvasBackground(color) {
        this.$canvas.setBackgroundColor(color, this.$canvas.renderAll.bind(this.$canvas))
      },
      resetBackgroundColor() {
        this.$canvas.setBackgroundColor('rgb(255,255,255)', this.$canvas.renderAll.bind(this.$canvas))
      },
      setBackgroundImage() {

      },
      changeTitle() {
        this.$store.commit('changeTitle', this.title)
      },
      changeWidgetControlsDetails() {
        let newConfig = {}
        if (this.detailsWidgetControls) {
          newConfig = {
            hasDetailsControls: true,
            hasRotatingPoint: true,
            borderColor: '#9e7ccb',
            cornerColor: '#ff0032',
            cornerStrokeColor: '#000000',
            _controlsVisibility: {
              bl: true,
              br: true,
              mb: true,
              ml: true,
              mr: true,
              mt: true,
              mtr: true,
              tl: true,
              tr: true
            }
          }
        } else {
          newConfig = {
            hasDetailsControls: false,
            hasRotatingPoint: false,
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
        }
        this.$store.commit('changeWidgetControlsDetails', newConfig)
        console.log('canvas',this.$canvas)
        this.$canvas._objects.forEach(item => {
          Object.assign(item, newConfig)
        })
        this.$canvas.renderAll()
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .el-color-picker
    float left
</style>
