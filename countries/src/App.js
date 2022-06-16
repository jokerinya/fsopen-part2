import React, { useState } from 'react';
import axios from 'axios';
import Countries from './components/Countries';
import Filter from './components/Filter';

const COUNTRIES_IN_LOCALSTORAGE = 'countries';

function App() {
    let countries = [];

    if (!!localStorage.getItem(COUNTRIES_IN_LOCALSTORAGE)) {
        console.log('Getting from localhost');

        countries = JSON.parse(localStorage.getItem(COUNTRIES_IN_LOCALSTORAGE));
    } else {
        console.log('Fetching from server');

        axios.get('https://restcountries.com/v3.1/all').then((response) => {
            countries = response.data;
            localStorage.setItem(COUNTRIES_IN_LOCALSTORAGE, JSON.stringify(countries));
        });
    }

    const [filterName, setFilterName] = useState('');

    const handleFilterNameChange = (event) => setFilterName(event.target.value);

    const countriesFiltered = countries.filter((country) => {
        return country.name.common.toLowerCase().includes(filterName.toLowerCase());
    });

    return (
        <>
            <div>Filter Name: {filterName}</div>
            <Filter filterName={filterName} onChange={handleFilterNameChange} />
            <Countries countries={countriesFiltered} />
        </>
    );
}

export default App;
