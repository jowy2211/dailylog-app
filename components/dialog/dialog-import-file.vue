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
              <v-file-input
                v-model="form.data.file"
                :rules="form.rules.file"
                show-size
                label="Acceptable format only .xlsx"
                solo
                flat
                prepend-icon=""
                prepend-inner-icon="mdi-file-excel"
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
        },
        rules: {
          file: [
            (v) => !!v || 'This field is reqiured',
            (v) => this.handlingSelectedFile(v),
          ],
        }
      },
      isDownloadTemplate: false,
    }
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
      console.log(`${this.$config.api}/api/file-storage/template`);
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