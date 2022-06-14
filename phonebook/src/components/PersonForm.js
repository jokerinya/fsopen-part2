import React from 'react';

const PersonForm = ({
    onFormSubmit,
    newNameValue,
    handleNameChange,
    newNumberValue,
    handleNumberChange,
}) => {
    return (
        <form onSubmit={onFormSubmit}>
            <div>
                name: <input value={newNameValue} onChange={handleNameChange} />
            </div>
            <div>
                number:{' '}
                <input
                    value={newNumberValue}
                    onChange={handleNumberChange}
                    type='number'
                />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    );
};

export default PersonForm;
