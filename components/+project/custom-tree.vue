<template>
  <div id="custom-canvas" class="customization-form customization-area">
    <ul>
      <li v-for="(item, index) in tree">
        <span>
          <i class="fa"
             v-bind:class="{'fa-lock-open':item.selectable,'fa-lock':!item.selectable}"
             @click="$canvas._objects[index].selectable = !$canvas._objects[index].selectable;$canvas.discardActiveObject()"/>
        </span>
        <span> [{{item.zindex}}] </span>
        <span> {{item.name}} <i class="fa fa-square" v-bind:style="{color: item.fill}"/> </span>
        <span v-if="item.text"> - {{item.text}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import ElButton from '../../node_modules/element-ui/packages/button/src/button.vue'

  export default {
    components: {ElButton},
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
        }
      })
    },
    methods: {
      deleteWidget() {
        this.$root.$emit('deleteWidget')
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
