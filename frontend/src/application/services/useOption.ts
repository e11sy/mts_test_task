import { Option } from '../../domain/entities';
import { optionService } from '../../domain';
import { onMounted, Ref, ref } from 'vue';

interface UseOptionsComposableState {
  options: Ref<Option[]>;
  getAllOptions: () => Promise<void>;
}

export default function useOptions(): UseOptionsComposableState {
  const options = ref<Option[]>([]);

  async function getAllOptions(): Promise<void> {
    const allOptions = await optionService.getAllOptions();

    options.value = allOptions;
  }

  return {
    getAllOptions,
    options,
  }
}