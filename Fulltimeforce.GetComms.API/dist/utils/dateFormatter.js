"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTime = exports.formatDate = void 0;
const moment = require("moment");
const formatDate = (date) => {
    const dateMoment = moment(date);
    if (!dateMoment.isValid()) {
        return '-';
    }
    return dateMoment.format('DD/MM/YYYY hh:mm A');
};
exports.formatDate = formatDate;
const calculateTime = (firstDate, secondDate) => {
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
    if (days)
        formattedTime += `${days}d `;
    if (hours)
        formattedTime += `${hours}h `;
    if (!days && minutes)
        formattedTime += `${minutes}m `;
    if (!days && seconds)
        formattedTime += `${seconds}s`;
    return formattedTime.trim();
};
exports.calculateTime = calculateTime;
//# sourceMappingURL=dateFormatter.js.map