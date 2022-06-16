import axios from 'axios';
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then((response) => {
            const personsFetched = response.data;
            setPersons(personsFetched);
            console.log(personsFetched);
        });
    }, []);

    const handleNameChange = (event) => setNewName(event.target.value);
    const handleNumberChange = (event) => setNewNumber(event.target.value);
    const handleNameFilterChange = (event) => setNameFilter(event.target.value);

    const checkEqualityOfNames = () => {
        const hasAlreadyAdded = persons.find(
            (person) => person.name === newName
        );
        // returns true if there is an obj
        return !!hasAlreadyAdded;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkEqualityOfNames()) {
            alert(`${newName} has already added to phonebook`);
            return;
        }
        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        };

        setPersons([...persons, newPerson]);
        setNewName('');
        setNewNumber('');
    };

    const personsToShow = persons.filter((person) => {
        return person.name.toLowerCase().includes(nameFilter.toLowerCase());
    });

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={nameFilter} onChange={handleNameFilterChange} />

            <h2>Add a new</h2>
            <PersonForm
                onFormSubmit={handleSubmit}
                newNameValue={newName}
                handleNameChange={handleNameChange}
                newNumberValue={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            <ul>
                <Persons persons={personsToShow} />
            </ul>
        </div>
    );
};

export default App;
