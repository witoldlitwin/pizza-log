import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { createClient } from '@supabase/supabase-js';

interface PizzaEntry {
  name: string;
  date: string;
  slices: number;
}

export const usePizzaStore = defineStore('pizza', () => {
  const users = ref<string[]>([]);
  const pizzaData = ref<PizzaEntry[]>([]);

  // Initialize Supabase client
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  // Fetch all users
  const fetchUsers = async () => {
    // Using a simpler query that achieves the same result
    const { data, error } = await supabase
      .from('pizza_log')
      .select('name')
      .order('name');

    if (error) {
      console.error('Error fetching users:', error);
      return;
    }

    // Remove duplicates using Set
    users.value = [...new Set(data.map(entry => entry.name))];
  };

  // Fetch all pizza consumption data
  const fetchAllData = async () => {
    const { data, error } = await supabase
      .from('pizza_log')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching data:', error);
      return;
    }

    pizzaData.value = data;
  };

  // Log new pizza consumption
  const logPizzaConsumption = async (entry: PizzaEntry) => {
    const { error } = await supabase
      .from('pizza_log')
      .insert([entry]);

    if (error) {
      console.error('Error logging pizza consumption:', error);
      return;
    }

    await Promise.all([
      fetchUsers(),
      fetchAllData()
    ]);
  };

  // Computed property for team-wide heatmap data
  const teamHeatmapData = computed(() => {
    const data: Record<string, number> = {};
    pizzaData.value.forEach(entry => {
      data[entry.date] = (data[entry.date] || 0) + entry.slices;
    });
    return data;
  });

  // Get heatmap data for a specific user
  const getUserHeatmapData = (userName: string) => {
    const data: Record<string, number> = {};
    pizzaData.value
      .filter(entry => entry.name === userName)
      .forEach(entry => {
        data[entry.date] = (data[entry.date] || 0) + entry.slices;
      });
    return data;
  };

  return {
    users,
    pizzaData,
    fetchUsers,
    fetchAllData,
    logPizzaConsumption,
    teamHeatmapData,
    getUserHeatmapData
  };
});