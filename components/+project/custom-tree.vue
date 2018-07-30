<template>
  <div id="custom-canvas" class="customization-form customization-area">
    <ol>
      <li v-for="(item, index) in tree"
          @mouseover="mouseOverOpacity(item)"
          @mouseleave="mouseLeaveOpacity"
          v-bind:class="{'isSelected': item.isSelectable}">
        <span>
          <i class="fa"
             v-bind:class="{'fa-lock-open':item.selectable,'fa-lock':!item.selectable}"
             @click="$canvas._objects[index].selectable = !$canvas._objects[index].selectable; $canvas.discardActiveObject()"/>
        </span>
        <span @click="selectItem(item, index)">
          <span> [{{item.zindex}}] </span>
        <span> {{item.name}} <i class="fa fa-cube" v-bind:style="{color: item.fill}"/></span>
        <span v-if="item.text"> - {{item.text}}</span>
        </span>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'customTree',
    data() {
      return {
        tree: []
      }
    },
    mounted() {
      this.tree = this.$canvas._objects

      this.$canvas.on({
        'object:added': () => {
          this.tree = this.$canvas._objects
        },
        'object:removed': () => {
          this.tree = this.$canvas._objects
        },
        'selection:created': this.findAndSetSelectedItem,
        'selection:updated': this.findAndSetSelectedItem,
        'selection:cleared': this.clearSelectedItem,
      })
    },
    methods: {
      deleteWidget() {
        this.$root.$emit('deleteWidget')
      },
      mouseOverOpacity(item) {
        this.$canvas.forEachObject(function (obj) {
          if (obj !== item) obj.set('opacity', 0.3)
        })
        this.$canvas.requestRenderAll()
      },
      mouseLeaveOpacity() {
        this.$canvas.forEachObject(function (obj) {
          obj.set('opacity', 1)
        })
        this.$canvas.requestRenderAll()
      },
      selectItem(item) {
        if (item.selectable) {
          this.$canvas.discardActiveObject()
          this.$canvas.setActiveObject(item)
          item.isSelectable = true
        }
      },
      findAndSetSelectedItem(selection) {
        this.clearSelectedItem()
        selection.selected.forEach(item => {
          this.tree.forEach(f => {
            if (f.name === item.name) {
              f.isSelectable = true
            }
          })
        })
      },
      clearSelectedItem() {
        this.$canvas.forEachObject(f => {
          f.isSelectable = false
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #custom-canvas
    ol
      padding: 0 0 0 20px
      li
        background none
        padding: 5px 0
        cursor: pointer
        &:hover
          background #0fffc1
          border-radius 3px
        &.isSelected
          background: rgba(255, 0, 0, .5)
</style>
