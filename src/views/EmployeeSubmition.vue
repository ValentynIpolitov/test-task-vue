<script >
import useEmployees from '../composables/employees';
import useEmployeeStatuses from '../composables/employeeStatuses';

export default {
    setup() {
        const { storeEmployee, errors } = useEmployees();
        const { employeeStatuses, getEmployeeStatuses } = useEmployeeStatuses();

        return { storeEmployee, errors, employeeStatuses, getEmployeeStatuses };
    },
    data: () => ({
        form: {
            valid: true,
            name: '',
            employee_id: '',
            department: '',
            employee_status_id: '',
            email: '',
            accomodation_requests: [],
            files: []
        },
        accomodation_request: '',
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
    mounted() {
        this.getEmployeeStatuses();
    },
    methods: {
        subitForm: function (form) {
            this.errors = {};

            // creating form data
            let formData = new FormData();

            formData.append('name', this.form.name);
            formData.append('employee_id', this.form.employee_id);
            formData.append('department', this.form.department);
            formData.append('employee_status_id', this.form.employee_status_id);
            formData.append('email', this.form.email);
            formData.append('accomodation_requests', []);

            // iteate over any file sent over appending the files to the form data.
            for (var i = 0; i < this.form.files.length; i++) {
                let file = this.form.files[i];
                formData.append('files[' + i + ']', file);
            }

            // iteate over any file sent over appending the files to the form data.
            for (var i = 0; i < this.form.accomodation_requests.length; i++) {
                let accomodation_request = this.form.accomodation_requests[i];
                formData.append('accomodation_requests[' + i + '][value]', accomodation_request.value);
            }

            // sending axios request
            this.storeEmployee(this.form).then(items => {
                if (Object.keys(this.errors).length === 0 && this.errors.constructor === Object) {
                    this.alert = true;
                    this.$refs.form.reset();
                    this.$refs.form.resetValidation();
                    this.form.accomodation_requests = [];
                    setTimeout(() => this.alert = false, 1700);
                } else {
                    this.alert = false;
                }
            });
        },
        addAccomodationRequest: function () {
            if (this.accomodation_request != '') {
                this.form.accomodation_requests.push({ value: this.accomodation_request });
                this.accomodation_request = '';
            }
        },

        deleteAccomodationRequest: function (index) {
            this.form.accomodation_requests.splice(index, 1);
        }
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

    <!-- server validation errors -->
    <div v-if="errors">
        <div v-for="error in errors" :key="error[0]"
            class="mb-2 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p>{{ error[0] }}</p>
        </div>
    </div>

    <!-- submission form -->
    <v-form ref="form" v-model="form.valid" lazy-validation @submit.prevent="subitForm(form)">
        <v-text-field prepend-inner-icon="mdi-account-outline" v-model="form.name" :rules="nameRules" label="Name"
            required clearable></v-text-field>

        <v-text-field prepend-inner-icon="mdi-card-account-details-outline" v-model="form.employee_id"
            :rules="employeeIDRules" label="Employee ID" required clearable></v-text-field>

        <v-text-field prepend-inner-icon="mdi-home-outline" v-model="form.department" :rules="departmentRules"
            label="Department" required clearable></v-text-field>

        <v-select prepend-inner-icon="mdi-text-box-outline" v-model="form.employee_status_id" :items="employeeStatuses"
            item-title="name" item-value="id" :rules="[v => !!v || 'Item is required']" label="Employment status"
            required clearable></v-select>

        <v-text-field prepend-inner-icon="mdi-at" v-model="form.email" :rules="emailRules" label="E-mail" required
            clearable></v-text-field>

        <v-text-field prepend-inner-icon="mdi-bookmark-plus-outline" v-model="accomodation_request"
            label="Accomodation request" required clearable></v-text-field>
        <a @click="addAccomodationRequest"
            class="mb-4 flex justify-center items-center contetn-center w-fit cursor-pointer hover:bg-blue-400 text-blue-500 hover:text-white py-2 px-4 border border-blue-400 hover:border-white transition-all drop-shadow-md rounded">
            <div class="mr-2">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            Add accomodation
        </a>
        <div class="flex flex-wrap items-center content-center gap-1 mb-2">
            <div class="mr-3 text-slate-500">
                Accomodation requests:
            </div>
            <div v-for="(request, index) in form.accomodation_requests" :key="index">
                <div
                    class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-blue-200 text-blue-700 rounded-full">
                    {{ request.value }}
                    <div @click="deleteAccomodationRequest" class="ml-2">
                        <span class="sr-only">Dismiss</span>
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <v-file-input accept=".pdf" v-model="form.files" name="files" placeholder="Upload your documents" label="File input" multiple
            prepend-icon="mdi-paperclip">
            <template v-slot:selection="{ fileNames }">
                <template v-for="fileName in fileNames" :key="fileName">
                    <v-chip size="small" label color="primary" class="mr-2">
                        {{ fileName }}
                    </v-chip>
                </template>
            </template>
        </v-file-input>

        <v-btn color="info" type="submit">
            Submit
        </v-btn>
    </v-form>
</template>
