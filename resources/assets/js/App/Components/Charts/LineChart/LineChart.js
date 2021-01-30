import React from 'react';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';

const LineChart = (props) => {
    const { data } = props;

    return (
        <div className="line-chart">
            <Chart
                height={400}
                data={data}
                padding={['auto', 'auto', 'auto', 'auto']}
                forceFit
            >
                <Axis name="date" />
                <Axis name="value" />
                <Legend position="top-left" layout="horizontal" offsetY={-15} />
                <Tooltip crosshairs={{ type: 'y' }} />
                <Geom
                    type="line"
                    position="date*value"
                    size={2}
                    color={[
                        'type',
                        ['#5B8FF9', '#F6BD16', '#E8684A', '#5AD8A6', '#5D7092'],
                    ]}
                />
            </Chart>
        </div>
    );
};

export default LineChart;
