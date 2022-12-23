<script lang="ts" setup>
  import { computed } from 'vue';
  import type { PropType } from 'vue';
  import type { Animal } from '../types';
  import { calculateAgeInYears, compareByProperty } from '../composables/helpers';


  const props = defineProps({
    animals: {
      type: Array as PropType<Array<Animal>>,
      required: true,
    },
  });

  let sortingColumn = "name";
  
  const animalsSortedByName = computed(() =>
    props.animals.slice().sort((animalA, animalB) => compareByProperty(animalA, animalB, sortingColumn))
  );

</script>

<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th>Index</th>
        <th>Species</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Age (yrs)</th>
        <th>Weight (kg)</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(
          { id, species, name, gender, birthdate, weight }, animalIndex
        ) in animalsSortedByName"
        :key="id"
        class="hover:bg-gray-200"
      >
        <td>{{ animalIndex + 1 }}</td>
        <td>{{ species }}</td>
        <td>{{ name }}</td>
        <td>{{ gender }}</td>
        <td>{{ calculateAgeInYears(new Date(birthdate)) }}</td>
        <td>{{ weight }}</td>
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
