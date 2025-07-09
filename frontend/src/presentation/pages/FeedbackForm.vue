<template>
  <div :class="$style['form-block']">
    <div :class="$style['form-block__card']">
      <div :class="$style['form-block__left']">
        <h2 :class="$style['form-block__title']">Заполните форму</h2>
        <p :class="$style['form-block__description']">
          На основе ваших ответов теста мы сформируем<br />
          рекомендации для применения инструментов<br />
          у вас в компании
        </p>
      </div>

      <div :class="$style['form-block__right']">
        <Select v-model="selectedOption" :items="selectOptions" placeholder="Выберите вариант" />
        <p v-if="selectError" :class="$style['form-block__error']">{{ selectError }}</p>
        
        <Input
          v-model="emailModel"
          placeholder="Электронная почта"
          type="email"
          :error="!!emailError"
          :message="emailError"
        />
        <Button @click="handleSubmit">Отправить</Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue';
import { Button, Select, Input } from '../components';
import useForm from '../../application/services/useForm';
import useOption from '../../application/services/useOption';
import { Form } from '../../domain/entities';
import { ContextMenuItem } from '../components/ContextMenu';

const { createForm } = useForm();
const { options, getAllOptions } = useOption();

const selectedOption = ref<ContextMenuItem | undefined>(undefined);
const selectOptions = ref<ContextMenuItem[]>([]);
const emailModel = defineModel<string>({ default: '' });

const emailError = ref<string | undefined>(undefined);
const selectError = ref<string | undefined>(undefined);

onMounted(async () => {
  await getAllOptions();
});

watch(options, () => {
  selectOptions.value = options.value.map((option) => {
    const item: ContextMenuItem = {
      title: option.title,
      type: 'default',
      onActivate: () => {
        selectedOption.value = item;
        selectError.value = undefined;
      },
    };
    return item;
  });
});


const formData = computed(() => {
  return {
    content: JSON.stringify({
      email: emailModel.value,
      option: selectedOption.value,
    }),
  } as Form;
});

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function handleSubmit() {
  let hasError = false;

  if (!emailModel.value || !isValidEmail(emailModel.value)) {
    emailError.value = 'Введите корректный email';
    hasError = true;
  } else {
    emailError.value = undefined;
  }

  if (!selectedOption.value) {
    selectError.value = 'Выберите вариант из списка';
    hasError = true;
  } else {
    selectError.value = undefined;
  }

  if (hasError) return;

  createForm(formData.value);

  // Очистка формы после успешной отправки
  emailModel.value = '';
  selectedOption.value = undefined;
}
</script>

<style module>
.form-block {
  font-family: Roboto, sans-serif;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
  background: #f5f6fa;
}

.form-block__card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  border-radius: 24px;
  padding: 40px;
  max-width: 1024px;
  width: 100%;
  gap: 32px;
}

.form-block__left {
  flex: 1;
}

.form-block__title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}

.form-block__description {
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

.form-block__right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-block__error {
  color: #ff0033;
  font-size: 13px;
  line-height: 1.2;
  margin-top: -8px;
  margin-bottom: 4px;
}
</style>