<template>
  <v-form ref="form" v-model="form.status" @submit.prevent="doSubmit">
    <v-row dense>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Project Name</label>
        <v-text-field
          v-model="form.data.name"
          :rules="form.rules.name"
          label="Project Name"
          solo
          flat
        />
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Project Start Date</label>
        <v-menu
          v-model="form.date.start_date"
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="form.data.start_date"
              :rules="form.rules.start_date"
              label="Project End Date"
              readonly
              solo
              flat
              append-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="form.data.start_date"
            no-title
            @input="form.date.start_date = false"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Project End Date</label>
        <v-menu
          v-model="form.date.end_date"
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="form.data.end_date"
              :rules="form.rules.end_date"
              :disabled="!form.data.start_date"
              label="Project End Date"
              readonly
              solo
              flat
              append-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            />
          </template>
          <v-date-picker
            v-model="form.data.end_date"
            :min="form.data.start_date"
            no-title
            @input="form.date.end_date = false"
          />
        </v-menu>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Project Scope & Goals</label>
        <v-textarea
          v-model="form.data.description"
          :rules="form.rules.description"
          label="Project Scope & Goals"
          solo
          flat
        />
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Project Status</label>
        <v-select
          v-model="form.data.status"
          :rules="form.rules.status"
          :items="$utilities.projectStatus()"
          :disabled="formType === 'CREATE'"
          label="Project Status"
          solo
          flat
        />
      </v-col>
      <v-col cols="12">
        <div class="white--text text-h5">Member Form</div>
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Member</label>
        <v-select
          v-model="form.temp.employee"
          :rules="form.rules.temp.employee"
          :items="employees"
          label="Select Member"
          solo
          flat
          return-object
        />
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Member Responsibility</label>
        <v-select
          v-model="form.temp.responsibility"
          :rules="form.rules.temp.responsibility"
          :items="responsibilities"
          label="Select Responsibility"
          solo
          flat
        />
      </v-col>
      <v-col cols="12" lg="6" md="6" sm="12">
        <label class="text-subtitle-2 white--text font-weight-bold">Detail Scope Task</label>
        <v-textarea
          v-model="form.temp.description"
          :rules="form.rules.temp.description"
          label="Describe Detail Scope Task"
          solo
          flat
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          class="text-none"
          color="accent"
          depressed
          @click="handlerAddMember"
        >
          <v-icon>mdi-plus</v-icon>
          Add Member
        </v-btn>
      </v-col>
      <v-col cols="12">
        <div class="white--text text-h5">Member Added</div>
      </v-col>
      <v-col cols="12">
        <v-simple-table flat class="mb-4">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Responsibility</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="members && members.length > 0">
              <tr
                v-for="(item, index) in members"
                :key="`item-member-${index}`"
              >
                <td>{{ item.employee?.text ?? '' }}</td>
                <td>
                  <span class="font-weight-bold">
                    {{ responsibilities.find((i) => i.value === item.responsibility)?.text ?? '-' }}
                  </span>
                </td>
                <td>
                  <v-tooltip content-class="elevation rounded" right>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        class="elevation rounded mr-1"
                        icon
                        small
                        v-on="on"
                        @click="handlerRemoveMember(item)"
                      >
                        <v-icon small color="error"> mdi-delete </v-icon>
                      </v-btn>
                    </template>
                    <span>Remove Member</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="4" class="text-center">No Member Added</td>
              </tr>
            </template>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="auto">
        <v-btn
          type="submit"
          color="primary"
          class="text-none"
          depressed
          height="48"
          width="150"
          :disabled="members && members.length === 0"
          :loading="isLoading"
        >
          Submit
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>


<script>
export default {
  name: 'FormProjectComponent',
  props: {
    formType: {
      type: String,
      default: 'CREATE'
    },
    detail: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      dialog: {
        status: false,
      },
      form: {
        status: false,
        data: {
          name: null,
          description: null,
          start_date: null,
          end_date: null,
          status: 'CREATED',
          member: []
        },
        temp: {
          employee: null,
          responsibility: null,
          description: null,
          is_active: true,
        },
        date: {
          start_date: false,
          end_date: false,
        },
        rules: {
          name: [(v) => !!v || 'This field is required.'],
          description: [(v) => !!v || 'This field is required.'],
          start_date: [(v) => !!v || 'This field is required.'],
          end_date: [(v) => !!v || 'This field is required.'],
          status: [(v) => !!v || 'This field is required.'],
          temp: {
            employee: [
              () => this.members.length > 0 || 'Add member is requied at least one member',
            ],
            responsibility: [
              () => this.members.length > 0 || 'Add member is requied at least one member',
            ],
            description: [
              () => this.members.length > 0 || 'Add member is requied at least one member',
            ],
          }
        },
      },
    };
  },
  computed: {
    members() {
      return this.$store.getters['user/getMemberList'];
    },
    employees() {
      return this.$store.getters['user/getEmployeeList'];
    },
    isLoading() {
      return this.$store.getters['project/getProjectLoading'];
    },
    responsibilities() {
      return this.$utilities.memberResponsibility();
    },
  },
  mounted() {
    if (this.detail) {
      const detail = { ...this.detail };
      this.form.data = {
        ...detail,
        member: detail.member.map((item) => ({
          id: item.id,
          employee_id: item.employee_id,
          responsibility: item.responsibility,
          description: item.description,
          is_active: item.is_active,
        })),
      };
    }
  },
  methods: {
    async handlerAddMember() {
      if (this.form.temp.employee && this.form.temp.responsibility && this.form.temp.description) {
        await this.$store.dispatch(
          'user/initAddMember',
          this.form.temp,
        );

        this.form.data.member.push({
          employee_id: this.form.temp.employee.value,
          responsibility: this.form.temp.responsibility,
          description: this.form.temp.description,
          is_active: true,
        });
        this.form.temp = {
          employee: null,
          responsibility: null,
          description: null,
          is_active: true,
        };
      }
    },
    async handlerRemoveMember(item) {
      await this.$store.dispatch(
        'user/initRemoveMember',
        item.employee,
      );

      this.form.data.member = this.form.data.member.filter((i) => i.employee_id !== item.employee.value);
    },
    doSubmit() {
      const status = this.$refs.form.validate();

      if (status) {
        this.$emit('onSubmit', this.form.data);
      }
    }
  }
};
</script>
