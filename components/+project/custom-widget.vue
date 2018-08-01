<template>
  <div id="custom-canvas" class="customization-form customization-area">
    <span v-if="!activeObject">Select any object from canvas</span>
    <el-form ref="form" :model="form" label-width="80px" v-if="activeObject">
      <el-form-item label="Rotate">
        <el-slider v-model="form.angle"
                   :show-tooltip="false"
                   :min="0"
                   :max="360"/>
      </el-form-item>
      <el-form-item label="Left">
        <el-slider v-model="form.left"
                   :show-tooltip="false"
                   :min="0"
                   v-bind:max="$store.state.canvasWidth"/>
      </el-form-item>
      <el-form-item label="Top">
        <el-slider v-model="form.top"
                   :show-tooltip="false"
                   :min="0"
                   v-bind:max="$store.state.canvasHeight"/>
      </el-form-item>
      <el-form-item label="Scale">
        <el-slider v-model="form.scale"
                   :show-tooltip="false"
                   :min="0.1"
                   :max="6"
                   :step="0.1"/>
      </el-form-item>
      <el-form-item label="SkewX" v-if="$store.state.hasDetailsControls">
        <el-slider v-model="form.skewX"
                   :show-tooltip="false"
                   :min="0"
                   :max="80"/>
      </el-form-item>
      <el-form-item label="SkewY" v-if="$store.state.hasDetailsControls">
        <el-slider v-model="form.skewY"
                   :show-tooltip="false"
                   :min="0"
                   :max="80"/>
      </el-form-item>
      <el-form-item label="Font Family"
                    v-if="activeObject.type === 'text' || activeObject.type === 'textbox'">
        <el-select id="custom-font" v-model="activeObject.fontFamily" :change="$canvas.requestRenderAll()" placeholder="Select" size="mini">
          <el-option
                  v-for="item in fonts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
            <span v-bind:style="{fontFamily: item.value}">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Color" v-if="activeObject.type === 'text' || activeObject.type === 'geometry'">
        <el-color-picker v-model="form.fill"></el-color-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import fonts from '@/assets/js/fonts.js'
  export default {
    name: 'customWidget',
    data() {
      return {
        form: {
          angle: 0,
          left: 0,
          top: 0,
          scale: 1,
          skewX: 0,
          skewY: 0,
          fill: '',
          selectable: true
        },
        fonts: fonts,
        textFont: '',
        activeObject: false
      }
    },
    mounted() {
      this.$canvas.on({
        'selection:updated': element => {
          console.log('selection:updated', element)
          this.updateSelectedObjectInfo(element)
        },
        'selection:created': element => {
          console.log('selection:created', element)
          this.updateSelectedObjectInfo(element)
        },
        'selection:cleared': this.resetActiveObject,
        'object:modified': this.updateSelectedObjectInfo,
        'object:moving': this.updateSelectedObjectInfo
      })
    },
    methods: {
      reRenderCanvas() {
        this.$canvas.requestRenderAll()
      },
      resetActiveObject() {
        this.activeObject = false
        this.$canvas.requestRenderAll()
      },
      updateSelectedObjectInfo() {
        this.activeObject = this.$canvas.getActiveObject()
        if (this.activeObject) {
          this.form = {
            angle: this.activeObject.angle || 0,
            left: this.activeObject.left || 0,
            top: this.activeObject.top || 0,
            scale: this.activeObject.scaleX || 0,
            skewX: this.activeObject.skewX || 0,
            skewY: this.activeObject.skewY || 0,
            fill: this.activeObject.fill || '#000000',
            selectable: this.activeObject.selectable || true
          }
        }
      },
      setNewSettings() {
        this.activeObject = this.$canvas.getActiveObject()
        this.activeObject
            .set('angle', this.form.angle)
            .set('left', this.form.left)
            .set('top', this.form.top)
            .set('skewX', this.form.skewX)
            .set('skewY', this.form.skewY)
            .set('scaleX', this.form.scale)
            .set('scaleY', this.form.scale)
            .set('fill', this.form.fill)
            .setCoords()
        this.$canvas.requestRenderAll()
      }
    },
    watch: {
      form: {
        handler() {
          this.setNewSettings()
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
