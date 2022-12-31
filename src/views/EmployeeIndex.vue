<template>
    <div class="flex justify-start items-center content-center">
        <v-select v-model="searchField" :items="headers.map(value => value.value)" label="Select field to search"
            persistent-hint class="w-1/3 mr-8">
        </v-select>

        <v-text-field v-model="searchValue" label="Search for the value" class="w-2/3">

        </v-text-field>
    </div>

    <EasyDataTable :headers="headers" :items="employees" :search-field="searchField" :search-value="searchValue">
        <template #item-accomodation_requests="{ accomodation_requests }">
            <div class="flex flex-wrap items-center content-center gap-1 mb-2 mt-2">
                <div v-for="(request, index) in accomodation_requests" :key="index">
                    <div
                        class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
                        {{ request.accomodation_name }}
                    </div>
                </div>
            </div>
        </template>

        <template #item-documents="{ documents }">
            <div class="flex flex-wrap items-center content-center gap-1 mb-2 mt-2">
                <div v-for="(document, index) in documents" :key="index">
                    <a @click="getEmployeeDocument(document.id)" class="cursor-pointer inline-block px-6 pt-2.5 pb-2 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download"
                            class="w-3 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor"
                                d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z">
                            </path>
                        </svg>
                        {{ document.name }}
                    </a>
                </div>
            </div>
        </template>
    </EasyDataTable>
</template>
  
<script lang="ts" setup>
import { ref } from "vue";
import type { Header, Item } from "vue3-easy-data-table";
import useEmployees from '../composables/employees';
import { onMounted } from "vue";

const { employees, getEmployees , getEmployeeDocument } = useEmployees();
const searchField = ref("");
const searchValue = ref("");

const headers: Header[] = [
    { text: "ID", value: "id", sortable: true },
    { text: "Name", value: "name", sortable: true },
    { text: "Employee ID", value: "employee_id", sortable: true },
    { text: "Department", value: "department", sortable: true },
    { text: "Employee status", value: "employee_status", sortable: true },
    { text: "Email", value: "email", sortable: true },
    { text: "Accomodatio requests", value: "accomodation_requests" },
    { text: "Documents", value: "documents" },
];

onMounted(() => getEmployees());
</script>
  