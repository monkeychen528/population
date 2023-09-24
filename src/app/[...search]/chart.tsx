'use-client';

import React, { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { MockDataInterface } from '@/interface/data';

function Chart(props: HighchartsReact.Props) {
  const LinearChartRef = useRef<HighchartsReact.RefObject>(null);
  const PieChartRef = useRef<HighchartsReact.RefObject>(null);
  const { cityData } = props;
  let ORDINARY_M = 0;
  let ORDINARY_F = 0;
  let SINGLE_M = 0;
  let SINGLE_F = 0;
  let total = 0;
  if (cityData) {
    cityData.responseData.forEach((item: MockDataInterface) => {
      ORDINARY_M += parseInt(item.household_ordinary_m, 10);
      ORDINARY_F += parseInt(item.household_ordinary_f, 10);
      SINGLE_M += parseInt(item.household_single_m, 10);
      SINGLE_F += parseInt(item.household_single_f, 10);
    });
  }
  total = ORDINARY_M + ORDINARY_F + SINGLE_M + SINGLE_F;

  const LinearOptions: Highcharts.Options = {
    title: {
      text: '人口數統計',
    },
    xAxis: {
      title: {
        text: '型態',
      },
      categories: ['共同生活', '獨立生活'],
    },
    yAxis: {
      title: {
        text: '數量',
        rotation: 0,
        align: 'high',
        offset: 0,
        y: -10,
        x: -15,
      },
    },
    series: [{
      name: '男性',
      data: [ORDINARY_M, SINGLE_M],
      type: 'column',
    }, {
      name: '女性',
      data: [ORDINARY_F, SINGLE_F],
      type: 'column',
    }],
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          formatter: function (this: Highcharts.PointLabelObject) {
            return this.y?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
          },
        },
      },
    },
  };

  const pieOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '戶數統計',
    },
    series: [{
      data: [{
        name: '共同生活',
        y: (ORDINARY_M + ORDINARY_F) / (total * 100),
      }, {
        name: '獨立生活',
        y: (SINGLE_M + SINGLE_F) / (total * 100),
      }],
      type: 'pie',
      slicedOffset: 2,
    }],
    plotOptions: { // 區塊指標
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f} %',
        },
        showInLegend: true,
      },
    },
    tooltip: { // hover 的提示塊
      pointFormat: '<b>{point.percentage:.1f}%</b>',
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
}

export default Chart;
