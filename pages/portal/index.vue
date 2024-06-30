<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card dark flat class="dailylog-app--card">
          <v-card-title>
            Welcome, Portal Admin!
          </v-card-title>
          <v-card-subtitle>Navigation Management Data</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="auto">
                <v-btn
                  text
                  exact
                  class="text-none"
                  nuxt
                  link
                  to="/portal/projects"
                >
                  Projects
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  text
                  exact
                  class="text-none"
                  nuxt
                  link
                  to="/portal/users"
                >
                  Users
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  text
                  exact
                  class="text-none"
                  nuxt
                  link
                  to="/portal/daily-logs"
                >
                  Import Daily Logs
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card dark flat color="transparent">
          <v-card-text>
            <v-row dense>
              <v-col cols="3">
                <v-card flat class="dailylog-app--card-no-background">
                  <v-card-title class="justify-space-between">Active Project<v-icon size="36">mdi-bookmark</v-icon></v-card-title>
                  <v-card-subtitle>TOTAL</v-card-subtitle>
                  <v-card-text>
                    <div class="text-h1 text-right font-weight-bold">
                      0
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card flat class="dailylog-app--card">
                  <v-card-title class="justify-space-between">Complete Project<v-icon size="36" color="success">mdi-bookmark-check</v-icon></v-card-title>
                  <v-card-subtitle>TOTAL</v-card-subtitle>
                  <v-card-text>
                    <div class="text-h1 text-right font-weight-bold">
                      0
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card flat class="dailylog-app--card">
                  <v-card-title class="justify-space-between">Discontinued Project<v-icon size="36" color="orange">mdi-bookmark-remove</v-icon></v-card-title>
                  <v-card-subtitle>TOTAL</v-card-subtitle>
                  <v-card-text>
                    <div class="text-h1 text-right font-weight-bold">
                      0
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="3">
                <v-card flat class="dailylog-app--card">
                  <v-card-title class="justify-space-between">Employee<v-icon size="36" color="yellow darken-1">mdi-lightning-bolt</v-icon></v-card-title>
                  <v-card-subtitle>TOTAL</v-card-subtitle>
                  <v-card-text>
                    <div class="text-h1 text-right font-weight-bold">
                      0
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card dark flat class="dailylog-app--card">
          <v-card-title>
            Bar Chart Performances
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card dark flat class="dailylog-app--card">
          <v-card-title>
            Bar Chart Achievements
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card dark flat class="dailylog-app--card">
          <v-card-title>
            Line Chart Load
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card dark flat class="dailylog-app--card">
          <v-card-title>
            Line Chart Overwork
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card dark flat class="dailylog-app--card">
          <v-card-title>
            Table Data List Current Projects
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PortalPage',
  transition: 'slide-x-transition',
}
</script>