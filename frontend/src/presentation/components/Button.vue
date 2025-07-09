<template>
  <button :class="[$style.button, $style[`button--${type}`]]">
    <span :class="$style['button__content']">
      <slot />
    </span>
    <span v-if="type === 'select'" :class="$style['button__icon']">
      <ChevronDownIcon/>
    </span>
  </button>
</template>

<script setup lang="ts">
import ChevronDownIcon from './ChevronDownIcon.vue';
withDefaults(
  defineProps<{
  type?: 'default' | 'select';
}>(),
{
  type: 'default',
});
</script>

<style module>
.button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: Roboto, sans-serif;
  padding: 12px 10px;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.2s ease;
  height: 36px;
}

.button--default {
  background-color: #ff0033;
  color: white;
  font-weight: 500;
  justify-content: center;
}

.button--select {
  background-color: white;
  border: 1px solid #d1d5db;
  color: #374151;
}

.button__content {
  text-align: left;
}

.button__icon {
  margin-left: 8px;
  display: flex;
  align-items: center;
}
</style>
