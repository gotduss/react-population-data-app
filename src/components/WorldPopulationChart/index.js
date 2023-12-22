/* Imports */
import React, { useState, useEffect } from 'react';
import { POP_API_URL, excludedCountryCodes } from '../Data';
import ReactEChart from 'echarts-for-react';

/* WorldPopulationChart Component */
const WorldPopulationChart = () => {
  const [totalResults, setTotalResults] = useState('');
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const fetchWorldPopulation = async () => {

      const url = `${POP_API_URL}/country/all/indicator/SP.POP.TOTL?format=json&per_page=${totalResults}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('data', data);

        // Filter out the excluded country codes
        const filteredData = data[1].filter((item) => !excludedCountryCodes.includes(item.country.id));
        console.log('filteredData', filteredData);
        // Sort the countries by population in descending order
        const sortedData = filteredData.filter((country) => country.date === '2022').sort((a, b) => b.value - a.value);

        // Get the top 10 countries
        const top10Countries = sortedData.slice(0, 10);

        setTotalResults(data[0].total);
        console.log('top10Countries', top10Countries);
        setCountriesData(top10Countries);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWorldPopulation();
  }, [totalResults]);

  const options = {
    title: {
      text: 'Top 10 Countries by Population (2022)',
    },
    xAxis: {
      type: 'category',
      data: countriesData.map((item) => item.country.value),
      axisLabel: {
        interval: 0, // Display all labels
        rotate: 45, // Rotate labels for better readability
      },
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis', // Show tooltips on hover over the bars
      axisPointer: {
        type: 'shadow', // Display tooltips as a shadow under the bars
      },
      formatter: '{b}: {c}', // Display the country name and its value in the tooltip
    },
    series: [
      {
        name: 'Population',
        type: 'bar',
        data: countriesData.map((country) => country.value),
        animation: true, // Enable animation
        animationDuration: 1000, // Animation duration in milliseconds
        animationEasing: 'cubicOut', // Animation easing function
      },
    ],
  };

  return (
    <div className="WorldPopulationChart">
      <h1>WorldPopulationChart</h1>
      <ReactEChart option={options} />
    </div>
  );
}

export default WorldPopulationChart;
