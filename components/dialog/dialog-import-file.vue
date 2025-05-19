<template>
  <v-dialog v-model="dialog" persistent max-width="700">
    <v-card light class="dailylog-app--card pa-5">
      <v-card-title class="flex flex-row align-center justify-space-between">
        <div class="white--text text-h4">Import Daily Log Activity</div>
        <v-btn icon color="white" @click="$emit('onClose')"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-subtitle>
        <div class="white--text text-subtitle-1">Select File to Upload</div>
      </v-card-subtitle>
      <v-form ref="form" v-model="form.status">
        <v-card-text>
          <v-row dense justify="end">
            <v-col cols="auto">
              <v-btn
                text
                class="text-none float-right white--text"
                height="48"
                link
                nuxt
                :disabled="isDownloadTemplate"
                @click="handlerDownloadTemplate"
              >
                <v-icon>mdi-file-download</v-icon>
                Download Template
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="selected.project_id"
                :rules="form.rules.project_id"
                :items="projects"
                item-text="name"
                label="Select Project"
                solo
                flat
                return-object
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="form.data.member_id"
                :rules="form.rules.member_id"
                :items="selected.project_id?.member"
                item-text="employee.fullname"
                item-value="id"
                label="Select Member"
                solo
                flat
                :disabled="!selected.project_id"
              />
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-model="form.data.file"
                :rules="form.rules.file"
                show-size
                label="Acceptable format only .xlsx"
                solo
                flat
                prepend-icon=""
                prepend-inner-icon="mdi-file-excel"
                :disabled="!selected.project_id"
              >
              </v-file-input>
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                class="text-none mb-2"
                depressed
                block
                height="48"
                :loading="isLoading"
                @click="doSubmit"
              >
                Add
              </v-btn>
              <v-btn
                class="text-none mb-2"
                depressed
                block
                height="48"
                :loading="isLoading"
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
import { fileRules } from '@/helpers/constant.js';

export default {
  name: 'DialogImportFileComponent',
  props: {
    isOpen: Boolean,
  },
  data() {
    return {
      dialog: false,
      form: {
        status: false,
        data: {
          file: null,
          member_id: null,
        },
        rules: {
          file: [
            (v) => !!v || 'This field is reqiured',
            (v) => this.handlingSelectedFile(v),
          ],
          project_id: [(v) => !!v || 'This field is required'],
          member_id: [(v) => !!v || 'This field is required'],
        }
      },
      selected: {
        project_id: null,
      },
      isDownloadTemplate: false,
    }
  },
  computed: {
    projects() {
      return this.$store.getters['project/getProjectList'];
    },
    isLoading() {
      return this.$store.getters['activity/getActivityLoading'];
    },
  },
  watch: {
    isOpen(val) {
      if (val) {
        this.form.data = {
          file: null,
        };
      }
      this.dialog = !!val;
    }
  },
  methods: {
    handlerDownloadTemplate() {
      this.isDownloadTemplate = true;
      const link = document.createElement('a');
      link.download = '';
      link.href = `${this.$config.api}/api/file-storage/template`;
      link.click();

      setTimeout(() => {
        this.isDownloadTemplate = false;
      }, 3000);
    },
    handlingSelectedFile(file) {
      if (file) {
        const checkFormat = !!(fileRules.formats.includes(file.type));
  
        if (!checkFormat) return 'Format selected file is not acceptable.';
  
        const checkSize = fileRules.maxSize > file.size;
  
        if (!checkSize) return 'Maximum size of selected file is 10MB';
  
        return true;
      } else {
        return false;
      }
    },
    async doSubmit() {
      const status = await this.$refs.form.validate();

      if (status) {
        this.$emit('onSubmit', this.form.data);
      }
    }
  }
}
</script>