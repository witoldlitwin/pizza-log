<script setup lang="ts">
import { onMounted } from 'vue';
import PizzaForm from './components/PizzaForm.vue';
import PizzaHeatmap from './components/PizzaHeatmap.vue';
import { usePizzaStore } from './stores/pizza';

const pizzaStore = usePizzaStore();

onMounted(async () => {
  await pizzaStore.fetchUsers();
  await pizzaStore.fetchAllData();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8">Pizza Log 🍕</h1>
      
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <PizzaForm />
      </div>

      <div class="space-y-8">
        <!-- Team-wide heatmap -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Team Pizza Consumption</h2>
          <PizzaHeatmap :data="pizzaStore.teamHeatmapData" />
        </div>

        <!-- Individual heatmaps -->
        <div v-for="user in pizzaStore.users" :key="user" class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">{{ user }}'s Pizza Consumption</h2>
          <PizzaHeatmap :data="pizzaStore.getUserHeatmapData(user)" />
        </div>
      </div>
    </div>
  </div>
</template>