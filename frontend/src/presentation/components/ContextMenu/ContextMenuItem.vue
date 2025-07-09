<template>
  <div :class="$style['item']">
    <div
      v-if="item.type === 'default' || !item.type"
      :class="[$style['item__default']]"
    >
      <div
        :class="$style['item__body']"
        @click="item.onActivate"
      >
        {{ item.title }}
      </div>
    </div>
    <div
      v-if="item.type === 'message'"
      :class="[$style['item__default'],
               $style['item__default--no-hover']]"
    >
      {{ item.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContextMenuItem } from './ContextMenu.types';

defineProps<{
  /**
   * Context menu item, can be default or separator
   */
  item: ContextMenuItem;
}>();
</script>

<style lang="postcss" module>
.item {
  &__default {
    gap: 8px;
    border-radius: 8px;
    padding: 8px 8px;

    &--no-hover {
      cursor: default;
    }
  }

  .item__default:not(.item__default--no-hover):hover {
    background-color: #F5F5F5;
    cursor: pointer;
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    word-wrap: break-word;
    min-height: 20px;
    gap: 8px;
  }
}
</style>
