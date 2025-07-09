<template>
  <div
    ref="contextMenu"
    :class="$style['context-menu']"
    :style="fixWidth !== 0 ? { width: `${fixWidth}px` } : {}"
  >
    <div
      v-if="showSearch"
      @focusin="showMenuItems = true"
      @focusout="showMenuItems = false"
      :class="$style['context-menu__search']"
    >
      <Input v-model="searchTerm" placeholder="Search" />
    </div>

    <div v-if="showMenuItems" :class="$style['context-menu__scrollable']">
      <ContextMenuItem
        v-for="(item, index) in filteredItems"
        :key="index"
        :item="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Input from '../Input.vue';
import type { ContextMenuItem as Item } from './ContextMenu.types';
import ContextMenuItem from './ContextMenuItem.vue';

const props = withDefaults(
  defineProps<{
    showSearch?: boolean;
    items: Item[];
  }>(),
  {
    showSearch: false,
  }
);

const contextMenu = ref<HTMLElement>();
let fixWidth = 0;

onMounted(() => {
  fixWidth = contextMenu.value?.getBoundingClientRect().width || 0;
});

const showMenuItems = ref(true);
const searchTerm = ref('');

const filteredItems = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase();

  if (!lowerCaseSearchTerm) return props.items;

  const includesSearchTerm = (item: Item) =>
    (item.type === 'default' || !item.type) &&
    item.title.toLowerCase().includes(lowerCaseSearchTerm);

  const searchedItems = props.items.filter((item) =>
    item.type === 'message' ? false : includesSearchTerm(item)
  );

  return searchedItems.length > 0 ? searchedItems : [messageItem];
});

const messageItem: Item = {
  type: 'message',
  message: 'Nothing found',
};
</script>

<style module>
.context-menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  z-index: 10;

  /* 🔻 Удаляем рамку и скругление */
  border: none;
  border-radius: 0;

  /* 🔻 Добавляем внутренние отступы */
  padding: 6px 0;
}

.context-menu__scrollable {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2px; /* небольшое расстояние между элементами */
}

.context-menu__item {
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
  color: #111827;
  line-height: 1.4;
}

.context-menu__item:hover {
  background-color: #f3f4f6;
  border-radius: 4px;
}
</style>
