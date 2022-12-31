import { ref } from 'vue'; 
import axios from 'axios';
import { useRouter } from 'vue-router';

axios.defaults.baseURL = 'http://localhost/api/v1/';

export default function useEmployees() {
    const employeeStatuses = ref([]);
    const errors = ref({});
    const router = useRouter();

    const getEmployeeStatuses = async () => {
        const response = await axios.get('employee-statuses');
        employeeStatuses.value = response.data.data;
    }

    return {
        employeeStatuses,
        getEmployeeStatuses,
        errors
    }
} 