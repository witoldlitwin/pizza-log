<script setup lang="ts">
import { computed } from 'vue';
import { eachDayOfInterval, subDays, format, parseISO } from 'date-fns';

const props = defineProps<{
  data: Record<string, number>
}>();

const today = new Date();
const yearAgo = subDays(today, 365);

const days = computed(() => {
  return eachDayOfInterval({ start: yearAgo, end: today }).map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return {
      date: dateStr,
      count: props.data[dateStr] || 0
    };
  });
});

const getColor = (count: number) => {
  if (count === 0) return 'bg-gray-100';
  if (count <= 2) return 'bg-green-200';
  if (count <= 4) return 'bg-green-300';
  if (count <= 6) return 'bg-green-400';
  return 'bg-green-500';
};
</script>

<template>
  <div class="overflow-x-auto">
    <div class="grid grid-cols-53 gap-1" style="min-width: 800px;">
      <div
        v-for="day in days"
        :key="day.date"
        :class="[
          'w-3 h-3 rounded-sm',
          getColor(day.count)
        ]"
        :title="`${format(parseISO(day.date), 'MMM d, yyyy')}: ${day.count} slices`"
      />
    </div>
  </div>
</template>