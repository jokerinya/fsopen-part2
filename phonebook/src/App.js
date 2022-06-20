import { useState, useEffect } from 'react';

import personsService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    useEffect(() => {
        personsService.getAll().then((personsFetched) => {
            setPersons(personsFetched);
            console.log(personsFetched);
        });
    }, []);

    const handleNameChange = (event) => setNewName(event.target.value);
    const handleNumberChange = (event) => setNewNumber(event.target.value);
    const handleNameFilterChange = (event) => setNameFilter(event.target.value);

    const nameIsAdded = () => {
        const hasAlreadyAdded = persons.find(
            (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        // returns true if there is an obj
        return !!hasAlreadyAdded;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (nameIsAdded()) {
            const response = window.confirm(
                `${newName} has already added to phonebook, replace the old number with a new one?`
            );
            if (!response) return;
            // user wants to update the number
            const existingPerson = persons.find(
                (person) => person.name === newName
            );
            const newPerson = { ...existingPerson, number: newNumber };
            personsService
                .update(newPerson.id, newPerson)
                .then((updatedPerson) => {
                    setPersons(
                        persons.map((person) =>
                            person.id !== updatedPerson.id
                                ? person
                                : updatedPerson
                        )
                    );
                });
            return;
        }
        const newPerson = {
            name: newName,
            number: newNumber,
            id: Math.random() + '',
        };

        personsService.create(newPerson).then((newAddedPerson) => {
            setPersons([...persons, newAddedPerson]);
            setNewName('');
            setNewNumber('');
        });
    };

    const handleDeletePerson = (id) => {
        const deletedPerson = persons.find((person) => person.id === id);
        if (
            window.confirm(
                `Do you really want to delete ${deletedPerson.name}'s info?`
            )
        ) {
            personsService.deletePerson(id).then((emptyObj) => {
                setPersons(
                    persons.filter((person) => person.id !== deletedPerson.id)
                );
            });
        }
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
                onNameChange={handleNameChange}
                newNumberValue={newNumber}
                onNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            <ul>
                <Persons
                    persons={personsToShow}
                    onDeletePerson={handleDeletePerson}
                />
            </ul>
        </div>
    );
};

export default App;
