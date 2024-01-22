/* Imports */
import React, { useState, useEffect } from 'react';
import { POP_API_URL, excludedCountryCodes, getChartOptions } from '../Data';
import ReactEChart from 'echarts-for-react';

/* WorldPopulationChart Component */
const WorldPopulationChart = () => {
  const [totalResults, setTotalResults] = useState('');
  const [countriesData, setCountriesData] = useState([]);
  const [australiaData, setAustraliaData] = useState([]);

  const fetchData = async (url, setDataCallback) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDataCallback(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    // Fetch data for the 10 largest countries
    const countriesUrl = `${POP_API_URL}/country/all/indicator/SP.POP.TOTL?format=json&per_page=${totalResults}`;
    fetchData(countriesUrl, (data) => {
      console.log('data', data);

      // Filter out the excluded country codes
      const filteredData = data[1].filter((item) => !excludedCountryCodes.includes(item.country.id));

      // Sort the countries by population in descending order
      const sortedData = filteredData.filter((country) => country.date === '2022').sort((a, b) => b.value - a.value);

      // Get the top 10 countries
      const top10Countries = sortedData.slice(0, 10);

      setTotalResults(data[0].total);
      console.log('top10Countries', top10Countries);
      setCountriesData(top10Countries);
    });
    const australiaIsoCode = 'AUS';
    const australiaUrl = `${POP_API_URL}/country/${australiaIsoCode}/indicator/SP.POP.TOTL?format=json`;
    fetchData(australiaUrl, (australiaData) => {
      console.log('australiaData', australiaData);

      // Process data as needed for the chart
      const processedAustraliaData = australiaData[1].map((entry) => ({
        year: entry.date,
        population: entry.value,
      }));

      // Sort Australia data by year in ascending order
      const sortedAustraliaData = processedAustraliaData.sort((a, b) => a.year - b.year);
      setAustraliaData(sortedAustraliaData);
    });
  }, [totalResults]);

  const topPopOptions = getChartOptions(
    'Top 10 Countries by Population (2022)',
    'bar',
    countriesData.map((item) => item.country.value),
    countriesData.map((country) => country.value)
  );

  const australiaOptions = getChartOptions(
    'Population Trend for Australia (Last 50 Years)',
    'line',
    australiaData.map((entry) => entry.year),
    australiaData.map((entry) => entry.population)
  );

  return (
    <div className="WorldPopulationChart">
      <h1>WorldPopulationChart</h1>
      {countriesData ? <ReactEChart option={topPopOptions} /> : <p>Loading chart data...</p>}
      {australiaData ? <ReactEChart option={australiaOptions} /> : <p>Loading Australia chart data...</p>}
    </div>
  );
}

export default WorldPopulationChart;
