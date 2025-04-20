const staticColors = [
  'rgba(75, 192, 192, 1)',  // Teal
  'rgba(255, 159, 64, 1)',  // Orange
  'rgba(153, 102, 255, 1)', // Purple
  'rgba(255, 205, 86, 1)',  // Yellow
  'rgba(46, 204, 113, 1)',  // Green
  'rgba(236, 64, 122, 1)',  // Pink
  'rgba(231, 76, 60, 1)',   // Crimson
  'rgba(52, 152, 219, 1)',  // Sky Blue
  'rgba(52, 73, 94, 1)',    // Slate (darker for contrast)
  'rgba(44, 62, 80, 1)',    // Midnight (darker)
  'rgba(241, 148, 138, 1)', // Coral
];

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
      { text: 'Bug Fix', value: 'BUG_FIXING', color: 'default' },
      { text: 'Code Review', value: 'CODE_REVIEW', color: 'default' },
      { text: 'Documentation', value: 'DOCUMENTATION', color: 'default' },
      { text: 'Training', value: 'TRAINING', color: 'default' },
      { text: 'Study', value: 'STUDY', color: 'default' },
      { text: 'Idle', value: 'IDLE', color: 'default' },
      { text: 'Off Work', value: 'OFF_WORK', color: 'default' },
      { text: 'Off Sick', value: 'OFF_SICK', color: 'default' },
      { text: 'Meeting', value: 'MEETING_INTERNAL', color: 'default' },
      { text: 'Discussion', value: 'DISCUSSION', color: 'default' },
      { text: 'Meeting with External', value: 'MEETING_EXTERNAL', color: 'default' },
      { text: 'Other Activity', value: 'OTHERS', color: 'default' },
    ],
    generateColors(count) {
      return staticColors[count];
    },
    getRandomUniqueColors(count, opacity = 0.5) {
      if (count <= 0) return [];
      const indices = Array.from({ length: staticColors.length }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      const selectedIndices = [];
      for (let i = 0; i < count; i++) {
        selectedIndices.push(indices[i]);
      }
      return selectedIndices.map((_, index) => {
        return staticColors[index]
      });
    }
  });
};
