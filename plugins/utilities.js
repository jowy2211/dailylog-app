export default ({ store }, inject) => {
  inject('utilities', {
    snackbar: async (data) => await store.dispatch('initSnackbar', data),
    projectStatus: () => [
      { text: 'Created', value: 'CREATED', color: 'purple' },
      { text: 'Initiation', value: 'INITIATION', color: 'info' },
      { text: 'Planning', value: 'PLANNING', color: 'primary' },
      { text: 'Development', value: 'DEVELOPMENT', color: 'orange' },
      { text: 'Testing', value: 'TESTING', color: 'warning' },
      { text: 'Complete', value: 'COMPLETE', color: 'success' },
      { text: 'Suspend', value: 'SUSPEND', color: 'error' },
      { text: 'Discontinued', value: 'DISCONTINUED', color: 'gray darken-1' },
    ],
    memberResponsibility: () => [
      { text: 'Front-End', value: 'FRONT_END', color: 'blue' },
      { text: 'Back-End', value: 'BACK_END', color: 'red' },
      { text: 'Full-Stack', value: 'FULL_STACK', color: 'orange' },
      { text: 'Mobile', value: 'MOBILE', color: 'green' },
      { text: 'Dev Ops', value: 'DEV_OPS', color: 'brown' },
      { text: 'UI / UX', value: 'UI_UX', color: 'purple' },
      { text: 'QA', value: 'QA_TESTER', color: 'yellow' },
      { text: 'Project Leader', value: 'PROJECT_LEAD', color: 'teal' },
      { text: 'Project Analyst', value: 'PROJECT_ANALYST', color: 'lime' },
      { text: 'Product Owner', value: 'PRODUCT_OWNER', color: 'gray darken-1' },
    ],
    categoryActivity: () => [
      { text: 'Project Task', value: 'TASK', color: 'default' },
      { text: 'Project Initiating', value: 'INITIATE', color: 'default' },
      { text: 'Project Research', value: 'RESEARCH', color: 'default' },
      { text: 'Study', value: 'STUDY', color: 'default' },
      { text: 'Idle', value: 'IDLE', color: 'default' },
      { text: 'Off Work', value: 'OFF_WORK', color: 'default' },
      { text: 'Off Sick', value: 'OFF_SICK', color: 'default' },
      { text: 'Meeting', value: 'MEETING_INTERNAL', color: 'default' },
      { text: 'Discussion', value: 'DISCUSSION', color: 'default' },
      { text: 'Meeting with External', value: 'MEETING_EXTERNAL', color: 'default' },
      { text: 'Other Activity', value: 'OTHERS', color: 'default' },
    ]
  });
};
