import { reactive, ref, shallowRef } from 'vue';
import { createSharedComposable } from '@vueuse/core';
import type { PopoverContent, PopoverShowParams } from './Popover.types';

/**
 * Shared singleton composable for Popover
 */
export const usePopover = createSharedComposable(() => {
  const isOpen = ref(false);

  const position = reactive({
    left: '0px',
    top: '0px',
    transform: 'translate(0, 0)',
  });

  const width = ref<string>('auto');
  const content = shallowRef<PopoverContent | null>(null);
  const targetElement = ref<HTMLElement | null>(null);

  function move(
    targetEl: HTMLElement,
    align: PopoverShowParams['align'],
    widthConfig: PopoverShowParams['width'] = 'auto'
  ): void {
    const MARGIN = 6;
    const rect = targetEl.getBoundingClientRect();

    let top = 0;
    let left = 0;
    let transformX = '0';
    let transformY = '0';

    switch (align.vertically) {
      case 'above':
        top = rect.top + window.scrollY - MARGIN;
        transformY = '-100%';
        break;
      case 'below':
      default:
        top = rect.bottom + window.scrollY + MARGIN;
        transformY = '0';
        break;
    }

    switch (align.horizontally) {
      case 'right':
        left = rect.right + window.scrollX;
        transformX = '-100%';
        break;
      case 'left':
      default:
        left = rect.left + window.scrollX;
        transformX = '0';
        break;
    }

    position.top = `${top}px`;
    position.left = `${left}px`;
    position.transform = `translate(${transformX}, ${transformY})`;

    if (widthConfig === 'fit-target') {
      width.value = `${rect.width}px`;
    } else {
      width.value = 'auto';
    }
  }

  function show(): void {
    isOpen.value = true;
  }

  function mountComponent(component: PopoverContent['component'], props: PopoverContent['props']): void {
    content.value = { component, props };
  }

  function showPopover(params: PopoverShowParams): void {
    targetElement.value = params.targetEl;
    move(params.targetEl, params.align, params.width);
    mountComponent(params.with.component, params.with.props);
    show();
  }

  function resetPopover(): void {
    targetElement.value = null;
    content.value = null;
    position.left = '0px';
    position.top = '0px';
    position.transform = 'translate(0, 0)';
    isOpen.value = false;
  }

  function hide(): void {
    resetPopover();
  }

  return {
    isOpen,
    showPopover,
    hide,
    content,
    width,
    position,
    targetElement,
  };
});
