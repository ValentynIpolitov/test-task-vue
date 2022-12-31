import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

axios.defaults.baseURL = 'http://localhost/api/v1/';

export default function useEmployees() {
    const employees = ref([]);
    const employee = ref([]);
    const errors = ref({});
    const router = useRouter();

    const getEmployees = async () => {
        const response = await axios.get('employees');
        employees.value = response.data.data;
    }

    const getEmployee = async (id) => {
        const response = await axios.get('employees' + id);
        employee.value = response.data.data;
    }

    const storeEmployee = async (data) => {
        try {
            await axios.post('employees', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await router.push({ 'name': 'employees' });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    }

    return {
        employee,
        employees,
        getEmployee,
        getEmployees,
        storeEmployee,
        errors
    }
} 