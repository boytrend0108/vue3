<template>
    <!-- The base block is stretched to the full width of the screen -->
    <div 
      class="dialog" 
      v-if="show" 
      @click="hideDialog"> 
        <!-- @click.stop means that click don't work with this div-->
          <div 
             @click.stop 
             class="dialog__content">
                  <slot></slot>
          </div>
    </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';
export default {
    name: 'my-dialog',// need to go to index.js and add this component
    mixins: [toggleMixin], // plug mixin in
}

</script>

<style scoped>
.dialog {
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}

.dialog__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-width: 350px;
    min-height: 50px;
    padding: 20px;
}
</style>