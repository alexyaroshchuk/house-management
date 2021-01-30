import React from 'react';
import { DatePicker as DatePickerAnt, ConfigProvider } from 'antd';
import propTypes from 'prop-types';
import enGB from 'antd/es/locale/en_GB';
import moment from 'moment';
import 'moment/locale/en-gb';

moment.locale('en-gb');

// import './DatePicker.scss';

const { RangePicker } = DatePickerAnt;

const DatePicker = (props) => {
    const { range, ...args } = props;

    if (range) {
        return (
            <ConfigProvider locale={enGB}>
                <RangePicker {...args} />
            </ConfigProvider>
        );
    }

    return (
        <ConfigProvider locale={enGB}>
            <DatePickerAnt {...args} />
        </ConfigProvider>
    );
};

DatePicker.defaultProps = {
    range: false,
};

DatePicker.propTypes = {
    range: propTypes.bool.isRequired,
    disabledDate: propTypes.func,
};

export default DatePicker;
