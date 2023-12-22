/* Imports */
import { useState, useEffect } from 'react';
import { POP_API_URL, excludedCountryCodes } from '../Data';

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

        console.log('data', data[0].total);

        // Filter out the excluded country codes
        const filteredData = data[1].filter((list) => !excludedCountryCodes.includes(list.country.id));
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
  }, []);

  return (
    <div className="WorldPopulationChart">
      <h1>WorldPopulationChart</h1>
    </div>
  );
}

export default WorldPopulationChart;
