import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Legend, Guide } from 'bizcharts';
import { weightMTS } from '@Utils/formatHelpers';

import './PieChart.scss';

const PieChart = (props) => {
    const { data } = props;
    const dollar = '$';

    const total = data.items.reduce((prev, current) => prev + current.count, 0);

    const setTotalFormat = () => {
        let result = total;
        let n = 0;

        while (result > 1000) {
            result /= 1000;
            n++;
        }

        result = +Math.floor(result) + (['', 'k', 'M', 'B', 'T'][n] || '');

        if (data.symbol === dollar) {
            result = dollar + result;
        } else if (data.symbol === weightMTS) {
            result = result + ' ' + weightMTS;
        } else {
            result = total;
        }

        return result;
    };

    const setCountItem = (count, symbol) => {
        count = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        if (symbol === dollar) {
            count = dollar + count;
        } else if (symbol === weightMTS) {
            count = count + ' ' + weightMTS;
        }

        return count;
    };

    const setPercentItem = (count, total) => {
        const summary = (count * 100) / total;

        return +summary.toFixed(2);
    };

    const chartData = data.items.map((item) => {
        return {
            ...item,
            count: setCountItem(item.count, data.symbol),
            percent: setPercentItem(item.count, total),
        };
    });

    return (
        <div className="pie-chart">
            <Chart
                width={260}
                height={260}
                data={chartData}
                padding={[10, 320, 10, 10]}
                forceFit
                onPlotClick={(ev) => {
                    console.log(ev);
                }}
            >
                <Coord type="theta" innerRadius={0.9} />
                <Axis name="percent" />
                <Legend
                    position="right-center"
                    offsetX={35}
                    itemFormatter={(val) =>
                        chartData.find((dataItem) => dataItem.item === val)
                            .count
                    }
                    useHtml={true}
                    itemTpl={`
                            <li 
                                class="g2-legend-list-item item-{index} {checked}" 
                                data-color="{originColor}" 
                                data-value="{originValue}" 
                                style="cursor: pointer;"
                            >
                                <div class="pie-chart-wrapper">
                                    <i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>
                                    <span class="g2-legend-text" style="font-size: 16px; line-height: 28px; color: rgba(0,0,0,0.65)">{originValue}</span>
                                </div>
                                <p class="pie-chart-value" style="font-size: 16px; line-height: 28px; color: rgba(0,0,0,0.85)">{value}</p>
                            </li>
                        `}
                />
                <Tooltip
                    showTitle={false}
                    itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                />
                <Geom
                    type="intervalStack"
                    position="percent"
                    color={['item', data.colors]}
                    select={false}
                />
                <Guide>
                    <Guide.Html
                        position={['50%', '50%']}
                        html={`
                                <div 
                                    class="guide-wrapper" 
                                    style="text-align: center"
                                >
                                    <p 
                                        class="title" 
                                        style="margin-bottom: 10px; font-size: 18px; line-height: 28px"
                                    >
                                        ${data.title}
                                    </p>
                                    <p 
                                        style="font-size: 38px; line-height: 46px; color: #000; opacity: 0.9"
                                    >
                                        ${setTotalFormat()}
                                    </p>
                                </div>
                            `}
                    />
                </Guide>
            </Chart>
        </div>
    );
};

export default PieChart;
