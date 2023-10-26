import * as moment from 'moment';

const formatDate = (date: string) => {
  const dateMoment = moment(date);
  if (!dateMoment.isValid()) {
    return '-';
  }
  return dateMoment.format('DD/MM/YYYY hh:mm A');
};

const calculateTime = (firstDate: string, secondDate: string) => {
  const startDate = moment(firstDate);
  const endDate = moment(secondDate);

  if (!startDate.isValid() || !endDate.isValid()) {
    return '-';
  }

  const duration = moment.duration(endDate.diff(startDate));

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  let formattedTime = '';

  if (days) formattedTime += `${days}d `;
  if (hours) formattedTime += `${hours}h `;
  if (!days && minutes) formattedTime += `${minutes}m `;
  if (!days && seconds) formattedTime += `${seconds}s`;

  return formattedTime.trim();
};

export { formatDate, calculateTime };
