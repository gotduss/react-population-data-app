// Gets the API base URL from the .env.local file
export const POP_API_URL = process.env.REACT_APP_POP_API_URL;

// List of excluded country codes (combined countries)
export const excludedCountryCodes = ['ZH', 'ZI', '1A', 'S3', 'B8', 'V2', 'Z4', '4E', 'T4', 'XC', 'Z7', '7E', 'T7', 'EU', 'F1', 'XE', 'XD', 'XF', 'ZT', 'XH', 'XI', 'XG', 'V3', 'ZJ', 'XJ', 'T2', 'XL', 'XO', 'XM', 'XN', 'ZQ', 'XQ', 'T3', 'XP', 'XU', 'XY', 'OE', 'S4', 'S2', 'V4', 'V1', 'S1', '8S', 'T5', 'ZG', 'ZF', 'T6', 'XT', '1W'];

// chartOptions
export const getChartOptions = (titleText, type, xAxisData, seriesData) => {
  return {
    title: {
      text: titleText || '',
    },
    xAxis: {
      type: 'category',
      data: xAxisData || [],
      axisLabel: {
        interval: 0,
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: '{b}: {c}',
    },
    series: [
      {
        name: 'Population',
        type: type || 'bar',
        data: seriesData || [],
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicOut',
      },
    ],
  };
};
