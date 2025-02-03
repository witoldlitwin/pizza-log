<script setup lang="ts">
import { ref } from 'vue';
import { usePizzaStore } from '../stores/pizza';

const pizzaStore = usePizzaStore();
const name = ref('');
const date = ref(new Date().toISOString().split('T')[0]);
const slices = ref(1);
const newName = ref('');
const showNewNameInput = ref(false);

const handleSubmit = async () => {
  const userName = showNewNameInput.value ? newName.value : name.value;
  if (!userName || !date.value || slices.value < 1) return;

  await pizzaStore.logPizzaConsumption({
    name: userName,
    date: date.value,
    slices: slices.value
  });

  // Reset form
  if (showNewNameInput.value) {
    newName.value = '';
    showNewNameInput.value = false;
  }
  slices.value = 1;
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="flex gap-4">
      <div class="flex-1" v-if="!showNewNameInput">
        <label class="block text-sm font-medium text-gray-700">Select Name</label>
        <select
          v-model="name"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
        >
          <option value="">Select a name</option>
          <option v-for="user in pizzaStore.users" :key="user" :value="user">
            {{ user }}
          </option>
        </select>
      </div>

      <div class="flex-1" v-else>
        <label class="block text-sm font-medium text-gray-700">New Name</label>
        <input
          type="text"
          v-model="newName"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
          placeholder="Enter name"
        />
      </div>

      <button
        type="button"
        @click="showNewNameInput = !showNewNameInput"
        class="mt-6 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        {{ showNewNameInput ? 'Select Existing' : 'Add New Name' }}
      </button>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          v-model="date"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Number of Slices</label>
        <input
          type="number"
          v-model="slices"
          min="1"
          max="20"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
        />
      </div>
    </div>

    <button
      type="submit"
      class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Log Pizza Consumption
    </button>
  </form>
</template>