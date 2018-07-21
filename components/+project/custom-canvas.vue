<template>
  <div id="custom-canvas" class="customization-form">
    <el-form ref="form" :model="form" label-width="0">
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
        title: this.$store.state.title
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
      }
    }
  }
</script>

<style lang="stylus" scoped>

  .el-color-picker
    float left
</style>
