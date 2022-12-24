<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import type { PropType } from 'vue';
  import type { Animal } from '../types';
  import { calculateAgeInYears, compareByProperty, nextMonthFoodSupply } from '../composables/helpers';


  const props = defineProps({
    animals: {
      type: Array as PropType<Array<Animal>>,
      required: true,
    },
  });


  const columnRef = ref(null);
  columnRef.value = "name";
  const animalsSorted = computed({
    get() {
      const reverse = columnRef.value == 'birthdate'; // Age is descending by default
      return props.animals.slice().sort((animalA, animalB) => compareByProperty(animalA, animalB, columnRef.value, reverse));
    },
    set(val) {
      columnRef.value = val;
    }
  });

</script>

<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th @click="() => animalsSorted = 'id'">Index</th>
        <th @click="() => animalsSorted = 'species'">Species</th>
        <th @click="() => animalsSorted = 'name'">Name</th>
        <th @click="() => animalsSorted = 'gender'">Gender</th>
        <th @click="() => animalsSorted = 'birthdate'">Age (yrs)</th>
        <th @click="() => animalsSorted = 'weight'">Weight (kg)</th>
        <th @click="() => animalsSorted = 'height'">Height (m)</th>
        <th @click="() => animalsSorted = 'favouriteFruit'">Favourite Fruit</th>
        <th>Next Month's Food Supply</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(animal, animalIndex) in animalsSorted"
        :key="id"
        class="hover:bg-gray-200"
      >
        <td>{{ animalIndex + 1 }}</td>
        <td>{{ animal.species }}</td>
        <td>{{ animal.name }}</td>
        <td>{{ animal.gender }}</td>
        <td>{{ calculateAgeInYears(new Date(animal.birthdate)) }}</td>
        <td>{{ animal.weight }}</td>
        <td>{{ animal.height }}</td>
        <td>{{ animal.favouriteFruit }}</td>
        <td>{{ nextMonthFoodSupply(animal).toFixed(2) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  @apply text-left;
}

td {
  @apply w-40;
}

tr {
  @apply border-b-2;
}
</style>
