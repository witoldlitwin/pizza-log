<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-8">🍕 Pizza Log</h1>
      
      <PizzaForm class="mb-12" />

      <!-- Team-wide heatmap -->
      <PizzaHeatmap
        title="Team Pizza Consumption"
        :data="pizzaData"
      />

      <!-- Individual heatmaps -->
      <div class="space-y-8">
        <PizzaHeatmap
          v-for="user in users"
          :key="user"
          :title="`${user}'s Pizza Consumption`"
          :data="getUserData(user)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { usePizzaStore } from './stores/pizzaStore';
import PizzaForm from './components/PizzaForm.vue';
import PizzaHeatmap from './components/PizzaHeatmap.vue';

const store = usePizzaStore();

const users = computed(() => store.users);
const pizzaData = computed(() => store.pizzaData);

const getUserData = (userName) => {
  return pizzaData.value.filter(entry => entry.name === userName);
};

onMounted(async () => {
  await store.fetchUsers();
  await store.fetchData();
});
</script> 