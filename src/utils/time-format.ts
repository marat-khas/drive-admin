const H = 'ч.';
const D = 'дн.';
const M = 'мин.';

export const timeFormat = (ms: number): string => {
    const res = [];
    const timeInMinutes = Math.floor(ms / 60000);
    const days = Math.floor(timeInMinutes / (60 * 24));
    const hours = Math.floor((timeInMinutes - days * 60 * 24) / 60);
    const minutes = timeInMinutes - days * 60 * 24 - hours * 60;
    if (days > 0) {
        res.push(`${days} ${D}`);
    }
    if ((days > 0 && minutes > 0) || hours > 0) {
        res.push(`${hours} ${H}`);
    }
    if (minutes > 0) {
        res.push(`${minutes} ${M}`);
    }
    return res.join(', ');
};
