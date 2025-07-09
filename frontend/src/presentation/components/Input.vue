<template>
  <div :class="$style['input-field']">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="[$style['input-field__control'], error && $style['input-field__control--error']]"
    />
    <p v-if="message" :class="$style['input-field__message']">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder?: string;
  type?: string;
  error?: boolean;
  message?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style module>
.input-field {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-field__control {
  width: 100%;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  padding: 4px 10px;
  border: 1px solid #d1d5db; /* ← тот же цвет, что в button--select */
  border-radius: 6px;
  outline: none;
  color: #111827;
  background-color: white;
  transition: border-color 0.2s ease;
  height: 30px;
  box-sizing: border-box;
}

.input-field__control::placeholder {
  color: #9ca3af;
}

.input-field__control:focus {
  border-color: #2563eb;
}

.input-field__control--error {
  border-color: #ef4444;
}

.input-field__message {
  color: #ef4444;
  font-size: 13px;
  margin-top: 4px;
}
</style>
