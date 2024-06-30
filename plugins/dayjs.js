import * as dayjs from 'dayjs';

export default (context, inject) => {
  inject('dayjs', {
    getTime: () => dayjs().format('HH:mm'),
    getText: () => {
      const hour = Number(dayjs().hour());

      if (hour >= 0 && hour < 12) {
        return 'Good Morning';
      } else if (hour >= 12 && hour < 18) {
        return 'Good Afternoon';
      } else if (hour >= 18 && hour < 22) {
        return 'Good Evening';
      } else {
        return 'Good Night';
      }
    }
  });
};