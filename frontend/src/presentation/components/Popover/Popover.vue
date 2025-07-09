<template>
  <div
    v-show="isOpen"
    ref="popoverEl"
    :class="$style.popover"
    :style="style"
  >

    <component
      :is="content.component"
      v-if="content"
      v-bind="content.props"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePopover } from './usePopover';
import { onClickOutside } from '@vueuse/core';

const popoverEl = ref<HTMLDivElement | null>(null);

const {
  isOpen,
  position,
  hide,
  content,
  width,
  targetElement,
} = usePopover();

onClickOutside(popoverEl, hide, {
  ignore: [targetElement],
});

const style = computed(() => ({
  left: position.left,
  top: position.top,
  transform: position.transform,
  width: width.value,
}));



</script>

<style module>
.popover {
  position: absolute;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 4px;
  font-family: Roboto, sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  min-width: 100px;
  max-width: 100%;
  overflow: hidden;

  /* Позиционирование из usePopover */
  left: v-bind('position.left');
  top: v-bind('position.top');
  transform: v-bind('position.transform');
  width: v-bind('width');
}
</style>

