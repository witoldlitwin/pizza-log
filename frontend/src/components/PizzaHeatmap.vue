<template>
  <div class="mb-8">
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <div class="overflow-x-auto">
      <div class="heatmap-container" :style="containerStyle">
        <div 
          v-for="(day, index) in days" 
          :key="index"
          class="heatmap-cell"
          :style="getCellStyle(day.count)"
          :title="`${day.date}: ${day.count} slices`"
        />
      </div>
    </div>
    <div class="flex items-center mt-2 text-sm">
      <span class="mr-2">Less</span>
      <div class="flex gap-1">
        <div 
          v-for="level in 5" 
          :key="level"
          class="w-4 h-4 rounded"
          :style="getCellStyle((level - 1) * 5)"
        />
      </div>
      <span class="ml-2">More</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
});

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(53, 1fr)',
  gap: '2px',
  width: 'fit-content'
};

const days = computed(() => {
  const today = new Date();
  const yearAgo = new Date();
  yearAgo.setFullYear(today.getFullYear() - 1);

  const daysArray = [];
  const dailyCounts = new Map();

  // Create map of dates and slice counts
  props.data.forEach(entry => {
    const date = entry.date;
    dailyCounts.set(date, (dailyCounts.get(date) || 0) + entry.slices);
  });

  // Fill in all days for the last year
  for (let d = new Date(yearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    daysArray.push({
      date: dateStr,
      count: dailyCounts.get(dateStr) || 0
    });
  }

  return daysArray;
});

const getCellStyle = (count) => {
  const opacity = Math.min(count / 20, 1); // Max intensity at 20 slices
  return {
    width: '10px',
    height: '10px',
    backgroundColor: `rgba(52, 211, 153, ${opacity})`,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '2px'
  };
};
</script>

<style scoped>
.heatmap-container {
  min-width: max-content;
}

.heatmap-cell {
  transition: transform 0.1s ease;
}

.heatmap-cell:hover {
  transform: scale(1.2);
}
</style> 