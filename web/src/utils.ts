import moment from 'moment';

const formatDate = (isoDate: string | Date) => {
    if (isoDate instanceof Date) {
        return moment(isoDate.toISOString()).format('MMMM Do, YYYY h:mm:ss A');
    }
    return moment(isoDate).format('MMMM Do, YYYY h:mm:ss A');
};

export { formatDate };