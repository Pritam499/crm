import moment from 'moment-timezone';

const DEFAULT_TIMEZONE = 'UTC'; // Change if needed

/**
 * Get current timestamp in UTC or specified timezone
 * @param {string} [timezone=DEFAULT_TIMEZONE]
 * @returns {string} - ISO formatted date-time string
 */
export const getCurrentTimestamp = (timezone = DEFAULT_TIMEZONE) => {
  return moment().tz(timezone).format();
};

/**
 * Convert a given date-time to a specific timezone
 * @param {string|Date} dateTime - The input date-time
 * @param {string} [timezone=DEFAULT_TIMEZONE] - Target timezone
 * @returns {string} - Converted date-time in ISO format
 */
export const convertToTimezone = (dateTime, timezone = DEFAULT_TIMEZONE) => {
  return moment(dateTime).tz(timezone).format();
};

/**
 * Format a date into a human-readable string
 * @param {string|Date} dateTime - Input date
 * @param {string} format - Moment.js format (e.g., "YYYY-MM-DD HH:mm:ss")
 * @param {string} [timezone=DEFAULT_TIMEZONE] - Timezone
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateTime, format = 'YYYY-MM-DD HH:mm:ss', timezone = DEFAULT_TIMEZONE) => {
  return moment(dateTime).tz(timezone).format(format);
};

/**
 * Get the difference between two dates in the given unit (e.g., days, hours)
 * @param {string|Date} date1 - First date
 * @param {string|Date} date2 - Second date
 * @param {string} unit - Time unit (e.g., "days", "hours", "minutes")
 * @returns {number} - Difference in specified unit
 */
export const getTimeDifference = (date1, date2, unit = 'days') => {
  return moment(date1).diff(moment(date2), unit);
};

/**
 * Add or subtract time from a given date
 * @param {string|Date} dateTime - Input date
 * @param {number} value - Value to add/subtract
 * @param {string} unit - Time unit (e.g., "days", "hours")
 * @returns {string} - Updated date-time in ISO format
 */
export const manipulateTime = (dateTime, value, unit = 'days') => {
  return moment(dateTime).add(value, unit).format();
};

/**
 * Check if a given date is before another date
 * @param {string|Date} date1
 * @param {string|Date} date2
 * @returns {boolean}
 */
export const isBefore = (date1, date2) => {
  return moment(date1).isBefore(moment(date2));
};

/**
 * Check if a given date is after another date
 * @param {string|Date} date1
 * @param {string|Date} date2
 * @returns {boolean}
 */
export const isAfter = (date1, date2) => {
  return moment(date1).isAfter(moment(date2));
};
