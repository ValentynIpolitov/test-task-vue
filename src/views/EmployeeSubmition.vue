<script >
import useEmployees from '../composables/employees';


export default {
    setup() {
        const { storeEmployee, errors } = useEmployees();

        return { storeEmployee, errors }
    },

    data: () => ({
        form: {
            valid: true,
            name: '',
            employee_id: '',
            department: '',
            employee_status_id: '',
            email: '',
        },
        items: [
            1, 2
        ],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length > 2) || 'Name must be at least 2 characters',
        ],
        employeeIDRules: [
            v => !!v || 'Employee ID is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        departmentRules: [
            v => !!v || 'Department is required',
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        alert: false,
    }),
    methods: {
        subitForm: function (form) {
            this.errors = {};
            this.storeEmployee(form).then(items => {
                if (Object.keys(this.errors).length === 0 && this.errors.constructor === Object) {
                    this.alert = true;
                    this.$refs.form.reset();
                    this.$refs.form.resetValidation();
                    setTimeout(() =>  this.alert = false, 1700);
                } else {
                    this.alert = false;
                }
            });
        },
    }
}
</script>

<template>
    <!-- success alert -->
    <div v-if="alert">
        <div class="bg-emerald-100 border-l-4 border-emerald-500 text-emerald-500 p-4 mb-2" role="alert">
            <p>Employee created succesfully</p>
        </div>
    </div>

    <!-- validation errors -->
    <div v-if="errors">
        <div v-for="error in errors" :key="error[0]"
            class="mb-2 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p>{{ error[0] }}</p>
        </div>
    </div>

    <!-- submission form -->
    <v-form ref="form" v-model="form.valid" lazy-validation @submit.prevent="subitForm(form)">
        <v-text-field v-model="form.name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

        <v-text-field v-model="form.employee_id" :counter="10" :rules="employeeIDRules" label="Employee ID"
            required></v-text-field>

        <v-text-field v-model="form.department" :counter="10" :rules="departmentRules" label="Department"
            required></v-text-field>

        <v-select v-model="form.employee_status_id" :items="items" :rules="[v => !!v || 'Item is required']"
            label="Employment status" required></v-select>

        <v-text-field v-model="form.email" :rules="emailRules" label="E-mail" required></v-text-field>


        <v-btn color="info" type="submit">
            Submit
        </v-btn>
    </v-form>
</template>
