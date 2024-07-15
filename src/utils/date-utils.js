import format from "date-fns/format";
import parse from "date-fns/esm/parse";

export const parseDateByPattern = (date, pattern) => {
    if (!pattern) return null;
    return parse(date, pattern, new Date());
};

export const parseDate = (date) => {
    if (!date) return null;
    return parseDateByPattern(date, "dd.MM.yyyy");
};

export const parseDateTime = (dateTime) => {
    if (!dateTime) return null;
    if (dateTime.length > 16) {
        return parseDateByPattern(dateTime, "dd.MM.yyyy HH:mm:ss");
    }
    return parseDateByPattern(dateTime, "dd.MM.yyyy HH:mm");
};

export const formatDateByPattern = (date, pattern) => {
    return format(date, pattern);
};

export const formatDate = (date) => {
    return formatDateByPattern(date, "dd.MM.yyyy");
};

export const formatDateTime = (date) => {
    return formatDateByPattern(date, "dd.MM.yyyy HH:mm");
};

export const formatDateLocal = (date) => {
    date = date.split('T')[0]
    const reverseDate = date.split('-')
    date = reverseDate[2] + '-' + reverseDate[1] + '-' + reverseDate[0];
    return date
}