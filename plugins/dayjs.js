import * as dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday, duration);

export default (context, inject) => {
  inject('dayjs', {
    getDate: () => dayjs().format('YYYY-MM-DD'),
    getFormattedDate: (value) => dayjs(value).format('dddd, DD MMM YYYY'),
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
    },
    rangeDateText: (start, end) => {
      return `${dayjs(start).format('DD MMM')} - ${dayjs(end).format('DD MMM YYYY')}`;
    },
    diffRangeDateText: (start, end) => {
      const dateNow = dayjs().format('YYYY-MM-DD');
      let status = { text: 'Ongoing', color: 'green' };

      const diffByStart = dayjs(start).diff(dateNow, 'day');
      const diffByEnd = dayjs(end).diff(dateNow, 'day');

      if (diffByStart < 0 && diffByEnd > 0) {
        status = { text: 'Good', color: 'green' };
      } else if (diffByStart < 0 && diffByEnd < 0) {
        status = { text: 'Warning! Deadline is out of date', color: 'red' };
      }

      return status;
    },
    durationRangeDateText: (start, end) => {
      const startDate = dayjs(start);
      const endDate = dayjs(end);
      let totalWorkingDay = 0;

      for (let i = 0; i <= endDate.diff(startDate, 'day'); i++) {
        const fixDate = startDate.add(i, 'day');

        if (fixDate.day() > 0 && fixDate.day() < 6) {
          totalWorkingDay += 1;
        }
      }

      return totalWorkingDay;
    }
  });
};