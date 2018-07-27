<template>
  <div id="controls">
    <el-button-group>
      <el-button type="primary" plain size="mini" @click="copyWidget"><i class="fa fa-copy"/></el-button>
      <el-button type="primary" plain size="mini" @click="cutWidget"><i class="fa fa-cut"/></el-button>
      <el-button type="primary" plain size="mini" @click="pasteWidget"><i class="fa fa-paste"/></el-button>
      <el-button type="danger" plain size="mini" @click="clearCanvas"><i class="fa fa-paperclip"/> Reset</el-button>
      <el-button type="danger" plain size="mini" @click="deleteWidget"><i class="fa fa-trash"/></el-button>
    </el-button-group>
  </div>
</template>

<script>
  export default {
    name: 'controls',
    data() {
      return {
        buffer: {
          copy: false
        }
      }
    },
    methods: {
      deleteWidget() {
        let group = this.$canvas.getActiveObjects()
        group.forEach(widget => {
          this.$canvas.remove(widget)
          this.$store.commit('decreaseWidgetsCounter')
        })
        this.$canvas.discardActiveObject()
      },
      clearCanvas() {
        this.$canvas.clear()
        this.$canvas.setBackgroundColor('rgb(255,255,255)', this.$canvas.renderAll.bind(this.$canvas))
      },
      copyWidget() {
        if (this.$canvas.getActiveObject()) {
          this.$canvas.getActiveObject().clone(cloned => {
            this.buffer.copy = cloned
          })
        }
      },
      pasteWidget() {
        if (this.buffer.copy) {
          this.$canvas.discardActiveObject()
          // clone again, so you can do multiple copies.
          this.buffer.copy.clone(clonedObj => {
            clonedObj.set({
              left: clonedObj.left + 10,
              top: clonedObj.top + 10,
              evented: true
            })
            if (clonedObj.type === 'activeSelection') {
              // active selection needs a reference to the canvas.
              clonedObj.canvas = this.$canvas
              clonedObj.forEachObject(obj => {
                obj.set(this.config)
                this.$canvas.add(obj)
              })
              clonedObj.setCoords()
            } else {
              clonedObj.set(this.config)
              this.$canvas.add(clonedObj)
            }
            this.buffer.copy.top += 10
            this.buffer.copy.left += 10
            this.$canvas.setActiveObject(clonedObj)
            this.$canvas.requestRenderAll()
          })
        }
      },
      cutWidget() {
        let obj = this.$canvas.getActiveObject()
        if (obj) {
          this.$canvas.getActiveObject().clone(cloned => {
            this.buffer.copy = cloned
          })
          if (obj._objects) {
            obj._objects.forEach(item => {
              this.$canvas.remove(item)
            })
            this.$canvas.requestRenderAll()
          } else {
            this.$canvas.remove(obj)
          }
          this.$canvas.discardActiveObject()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #controls
    width 100%
    height 40px
    position absolute
    top 0
    left 0
    right 0
    background #000000
    align-items center
    justify-content center
    display flex
    padding 0 6px

</style>
