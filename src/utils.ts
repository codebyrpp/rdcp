import moment from 'moment';

const formatDate = (isoDate: string) => {
    return moment(isoDate).format('MMMM Do, YYYY h:mm:ss A');
};

export { formatDate };