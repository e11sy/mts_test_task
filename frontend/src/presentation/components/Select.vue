<template>
  <Button
    @click="!isOpen ? togglePopover($event.currentTarget, { vertically: 'below', horizontally: 'left' }) : hide()"
    type="select"
  >
    {{ 'title' in activeItem ? activeItem.title : activeItem.message}}
  </Button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { watchImmediate } from '@vueuse/core';
import type { DefaultItem, ContextMenuItem as Item } from './ContextMenu/ContextMenu.types';
import ContextMenu from './ContextMenu';
import Button from './Button.vue';
import { usePopover, type PopoverShowParams } from './Popover';

const props = defineProps<{
  modelValue?: Item;
  items: Item[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Item | undefined): void;
}>();

const { showPopover, hide, isOpen } = usePopover();

/**
 * Default item to show when nothing is selected
 */
const defaultValue: Item = {
  title: 'выберите вариант',
  type: 'default',
  onActivate: () => {},
};

const activeItem = ref<Item>(props.modelValue ?? defaultValue);

/**
 * Update selected item visually and emit value to parent
 */
const updateActiveItem = (item: Item) => {
  if (item.type === 'default' || !item.type) {
    activeItem.value = Object.create(item);
    (activeItem.value as DefaultItem).onActivate = () => {};
    emit('update:modelValue', item);
    hide();
  }
};

/**
 * Watch for external changes to v-model
 */
watch(() => props.modelValue, (newVal) => {
  activeItem.value = newVal ?? defaultValue;
});

/**
 * Wrap original onActivate functions to also update activeItem
 */
watchImmediate(() => props.items, () => {
  props.items.forEach((item) => {
    if (item.type === 'default' || !item.type) {
      const originalOnActivate = item.onActivate;

      item.onActivate = () => {
        originalOnActivate?.();
        updateActiveItem(item);
      };
    }
  });
});

/**
 * Popover logic
 */
const togglePopover = (el: HTMLElement, align: PopoverShowParams['align']) => {
  showPopover({
    targetEl: el,
    with: {
      component: ContextMenu,
      props: {
        showSearch: false,
        items: props.items,
      },
    },
    align,
    width: 'fit-target',
  });
};
</script>
