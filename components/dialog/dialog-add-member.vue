<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card class="dailylog-app--card pa-5">
      <v-card-title class="flex flex-row align-center justify-space-between">
        <div class="white--text text-h4">Employee List</div>
        <v-btn icon color="white" @click="$emit('onClose')"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-subtitle>
        <div class="white--text text-subtitle-1">Add member to the project</div>
      </v-card-subtitle>
      <v-form ref="form" v-model="form.status">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-select
                v-model="form.data.employee_id"
                :rules="form.rules.employee_id"
                :items="employees"
                label="Select Employee"
                solo
                flat
                return-object
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="form.data.responsibility"
                :rules="form.rules.responsibility"
                :items="$utilities.memberResponsibility()"
                label="Select Responsibility"
                solo
                flat
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="form.data.description"
                :rules="form.rules.description"
                label="Describe Detail Scope Task"
                solo
                flat
              />
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                class="text-none mb-2"
                depressed
                block
                height="48"
                @click="doSubmit"
              >
                Add
              </v-btn>
              <v-btn
                class="text-none mb-2"
                depressed
                block
                height="48"
                @click="$emit('onClose')"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogAddMemberComponent',
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      dialog: false,
      form: {
        status: false,
        data: {
          employee_id: null,
          responsibility: null,
          description: null,
          is_active: true,
        },
        rules: {
          employee_id: [(v) => !!v || 'This field is reqiured'],
          responsibility: [(v) => !!v || 'This field is reqiured'],
          description: [(v) => !!v || 'This field is reqiured'],
        }
      }
    }
  },
  computed: {
    employees() {
      const list = this.$store.getters['user/getEmployeeList'];

      return [...list];
    }
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.form.data = {
          employee_id: null,
          responsibility: null,
          description: null,
          is_active: true,
        };
      }
      this.dialog = !!val;
    }
  },
  methods: {
    async doSubmit() {
      const status = await this.$refs.form.validate();

      if (status) {
        await this.$store.dispatch(
          'user/initAddMember',
          this.form.data,
        );

        this.$emit('onClose');
      }
    }
  }
}
</script>