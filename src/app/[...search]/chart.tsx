"use-client"
import React, { useRef } from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { MockDataInterface } from '@/interface/data';

const Chart = (props: HighchartsReact.Props) => {
    const LinearChartRef = useRef<HighchartsReact.RefObject>(null);
    const PieChartRef = useRef<HighchartsReact.RefObject>(null);
    const { cityData } = props
    let ordinary_m = 0, ordinary_f = 0, single_m = 0, single_f = 0, total = 0
    if (cityData)
        cityData.responseData.forEach((item: MockDataInterface) => {
            ordinary_m += parseInt(item.household_ordinary_m)
            ordinary_f += parseInt(item.household_ordinary_f)
            single_m += parseInt(item.household_single_m)
            single_f += parseInt(item.household_single_f)
        })
    total = ordinary_m + ordinary_f + single_m + single_f

    const LinearOptions: Highcharts.Options = {
        title: {
            text: '人口數統計'
        },
        xAxis: {
            title: {
                text: '型態'
            },
            categories: ["共同生活", "獨立生活"]
        },
        yAxis: {
            title: {
                text: '數量',
                rotation: 0,
                align: 'high',
                offset: 0,
                y: -10,
                x: -15
            },
        },
        series: [{
            name: '男性',
            data: [ordinary_m, single_m],
            type: 'column',
        }, {
            name: '女性',
            data: [ordinary_f, single_f],
            type: 'column',
        }],
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.y?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                    }
                }
            },
        },
    };

    const pieOptions: Highcharts.Options = {
        chart: {
            type: 'pie',
        },
        title: {
            text: '戶數統計'
        },
        series: [{
            data: [{
                name: '共同生活',
                y: (ordinary_m + ordinary_f) / total * 100,
            }, {
                name: '獨立生活',
                y: (single_m + single_f) / total * 100
            }],
            type: 'pie',
            slicedOffset: 2
        }],
        plotOptions: { // 區塊指標
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f} %'
                },
                showInLegend: true
            }
        },
        tooltip: { // hover 的提示塊
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
    };

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={LinearOptions}
                ref={LinearChartRef}
                {...props}
            />
            <HighchartsReact
                highcharts={Highcharts}
                options={pieOptions}
                ref={PieChartRef}
                {...props}
            />
        </>
    );
};

export default Chart