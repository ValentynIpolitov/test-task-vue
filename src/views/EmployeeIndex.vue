<template>
    <div class="flex justify-start items-center content-center">
        <v-select v-model="searchField" :items="headers.map(value => value.value)" label="Select field to search"
            persistent-hint class="w-1/3 mr-8">
        </v-select>
    
        <v-text-field v-model="searchValue" label="Search for the value" class="w-2/3">
    
        </v-text-field>
    </div>

    <EasyDataTable :headers="headers" :items="employees" :search-field="searchField" :search-value="searchValue" />
</template>
  
<script lang="ts" setup>
import { ref } from "vue";
import type { Header, Item } from "vue3-easy-data-table";
import useEmployees from '../composables/employees';
import { onMounted } from "vue";

const {employees, getEmployees} = useEmployees();
const searchField = ref("");
const searchValue = ref("");

const headers: Header[] = [
    { text: "ID", value: "id", sortable: true  },
    { text: "Name", value: "name", sortable: true  },
    { text: "Employee ID", value: "employee_id", sortable: true  },
    { text: "Department", value: "department", sortable: true  },
    { text: "Employee status", value: "employee_status", sortable: true  },
    { text: "Email", value: "email", sortable: true  },
];

onMounted(() => getEmployees());
</script>
  