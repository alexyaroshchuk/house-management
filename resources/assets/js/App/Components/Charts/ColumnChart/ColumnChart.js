import React from 'react';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';

const ColumnChart = (props) => {
    const { data } = props;

    return (
        <div>
            <Chart
                height={400}
                data={data}
                padding={['auto', 'auto', 'auto', 'auto']}
                forceFit
            >
                <Axis name="date" />
                <Axis name="value" />
                <Tooltip />
                <Geom
                    type="interval"
                    position="date*value"
                    color={[
                        'value',
                        (val) => {
                            if (val < 0) {
                                return 'rgba(245,34,45,0.85)';
                            }

                            return 'rgba(91,143,249,0.85)';
                        },
                    ]}
                />
            </Chart>
        </div>
    );
};

export default ColumnChart;
