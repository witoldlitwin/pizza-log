<template>
  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Name
      </label>
      <select
        v-if="store.users.length"
        v-model="formData.name"
        id="name"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        required
      >
        <option value="">Select a name</option>
        <option v-for="user in store.users" :key="user" :value="user">
          {{ user }}
        </option>
      </select>
      <input
        v-else
        v-model="formData.name"
        type="text"
        id="name"
        placeholder="Enter your name"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        required
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
        Date
      </label>
      <input
        v-model="formData.date"
        type="date"
        id="date"
        :max="today"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        required
      />
    </div>

    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="slices">
        Number of Slices
      </label>
      <input
        v-model.number="formData.slices"
        type="number"
        id="slices"
        min="1"
        max="20"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        required
      />
      <p class="text-sm text-gray-500 mt-1">Maximum 20 slices per day</p>
    </div>

    <div class="flex items-center justify-between">
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        :disabled="store.loading"
      >
        {{ store.loading ? 'Saving...' : 'Log Pizza' }}
      </button>
    </div>

    <div v-if="store.error" class="mt-4 text-red-500 text-sm">
      {{ store.error }}
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePizzaStore } from '../stores/pizzaStore';

const store = usePizzaStore();

const formData = ref({
  name: '',
  date: '',
  slices: 1
});

const today = computed(() => {
  const now = new Date();
  return now.toISOString().split('T')[0];
});

const handleSubmit = async () => {
  try {
    await store.logPizza(
      formData.value.name,
      formData.value.date,
      formData.value.slices
    );
    
    // Reset form after successful submission
    formData.value = {
      name: '',
      date: '',
      slices: 1
    };
  } catch (error) {
    console.error('Failed to submit:', error);
  }
};
</script> 