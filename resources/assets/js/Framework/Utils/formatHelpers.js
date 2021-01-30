import moment from 'moment';

const weightKg = 'kg';
const weightMTS = 'MTS';
const oneThousand = 1000;
const oneHundred = 100;

const formatNumber = (number) => {
    const str = String(number);
    return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const formatDate = (date) => {
    var dateTime = new Date(date);
    return moment(dateTime).format('DD.MM.YYYY');
};

const formatWeightKG = (data) => `${formatNumber(data)} ${weightKg}`;

const formatCurrency = (data) => {
    let str = String(data);

    if (str.includes('-')) {
        str = str.replace('-', '');
        return `- $ ${formatNumber(str)}`;
    }

    return `$ ${formatNumber(data)}`;
};

const formatWeightMTS = (data) =>
    `${formatNumber(data / oneThousand)} ${weightMTS}`;

const getCurrentDate = () => {
    return moment();
};

const datePickerFormat = () => {
    return 'DD/MM/YYYY';
};

const momentDatePickerFormat = () => {
    return 'DD.MM.YYYY';
};

const momentFormatDate = (date) => {
    return moment(date);
};

export {
    formatNumber,
    formatDate,
    formatWeightKG,
    formatCurrency,
    formatWeightMTS,
    getCurrentDate,
    datePickerFormat,
    momentFormatDate,
    momentDatePickerFormat,
    weightKg,
    weightMTS,
    oneThousand,
    oneHundred,
};
