# Exercises

## 2.1 - 2.5: [courseinfo](https://github.com/jokerinya/fsopen-part2/tree/main/courseinfo)

> ## Exercises 2.6.-2.10.

In the first exercise, we will start working on an application that will be further developed in the later exercises. In related sets of exercises it is sufficient to return the final version of your application. You may also make a separate commit after you have finished each part of the exercise set, but doing so is not required.

**WARNING** `create-react-app` will automatically turn your project into a git-repository unless you create your application inside of an existing git repository. It's likely that you **do not want** your project to be a repository, so simply run the `rm -rf .git` command at the root of your application.

## 2.6: The Phonebook Step1

Let's create a simple phonebook. **_In this part we will only be adding names to the phonebook._**

Let us start by implementing the addition of a person to phonebook.

You can use the code below as a starting point for the App component of your application:

```js
import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
    const [newName, setNewName] = useState('');

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            ...
        </div>
    );
};

export default App;
```

The `newName` state is meant for controlling the form input element.

Sometimes it can be useful to render state and other variables as text for debugging purposes. You can temporarily add the following element to the rendered component:

```js
<div>debug: {newName}</div>
```

It's also important to put what we learned in the debugging React applications chapter of part one into good use. The React developer tools extension especially, is incredibly useful for tracking changes that occur in the application's state.

After finishing this exercise your application should look something like this:
![Application](./readmeimg/10e.png)

Note the use of the React developer tools extension in the picture above!

**NB:**

-   you can use the person's name as value of the key property
-   remember to prevent the default action of submitting HTML forms!

## 2.7: The Phonebook Step2

Prevent the user from being able to add names that already exist in the phonebook. JavaScript arrays have numerous suitable methods for accomplishing this task. Keep in mind how object equality works in Javascript.

Issue a warning with the `alert` command when such an action is attempted:
![Alert](./readmeimg/11e.png)

**Hint:** when you are forming strings that contain values from variables, it is recommended to use a template string:

```js
`${newName} is already added to phonebook`;
```

If the `newName` variable holds the value Arto Hellas, the template string expression returns the string

```js
`Arto Hellas is already added to phonebook`;
```

The same could be done in a more Java-like fashion by using the plus operator:

```js
newName + ' is already added to phonebook';
```

Using template strings is the more idiomatic option and the sign of a true JavaScript professional.

## 2.8: The Phonebook Step3

Expand your application by allowing users to add phone numbers to the phone book. You will need to add a second input element to the form (along with its own event handler):

```html
<form>
    <div>name: <input /></div>
    <div>number: <input /></div>
    <div><button type="submit">add</button></div>
</form>
```

At this point the application could look something like this. The image also displays the application's state with the help of React developer tools:
<<<<<<< HEAD

=======
>>>>>>> 8f974a8c71ea71f64d8edb4a570c02a2bd003852
![Devtools](./readmeimg/12e.png)

## 2.9\*: The Phonebook Step4

Implement a search field that can be used to filter the list of people by name:
![Search](./readmeimg/13e.png)

You can implement the search field as an `input` element that is placed outside the HTML form. The filtering logic shown in the image is case insensitive, meaning that the search term arto also returns results that contain Arto with an uppercase A.

**NB:** When you are working on new functionality, it's often useful to "hardcode" some dummy data into your application, e.g.

```js
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    ]);

    // ...
};
```

This saves you from having to manually input data into your application for testing out your new functionality.

## 2.10: The Phonebook Step5

If you have implemented your application in a single component, refactor it by extracting suitable parts into new components. Maintain the application's state and all event handlers in the App root component.

It is sufficient to extract **three** components from the application. Good candidates for separate components are, for example, the search filter, the form for adding new people into the phonebook, a component that renders all people from the phonebook, and a component that renders a single person's details.

The application's root component could look similar to this after the refactoring. The refactored root component below only renders titles and lets the extracted components take care of the rest.

```js
const App = () => {
  // ...

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter ... />

      <h3>Add a new</h3>

      <PersonForm
        ...
      />

      <h3>Numbers</h3>

      <Persons ... />
    </div>
  )
}
```

> ## Exercises 2.11.-2.14.

## 2.11: The Phonebook Step6

We continue with developing the phonebook. Store the initial state of the application in the file `db.json`, which should be placed in the root of the project.

```json
{
    "persons": [
        {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": 1
        },
        {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": 2
        },
        {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": 3
        },
        {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": 4
        }
    ]
}
```

Start json-server on port 3001 and make sure that the server returns the list of people by going to the address http://localhost:3001/persons in the browser.

If you receive the following error message:

```js
events.js:182
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE 0.0.0.0:3001
    at Object._errnoException (util.js:1019:11)
    at _exceptionWithHostPort (util.js:1041:20)
```

it means that port 3001 is already in use by another application, e.g. in use by an already running json-server. Close the other application, or change the port in case that doesn't work.

Modify the application such that the initial state of the data is fetched from the server using the `axios-library`. Complete the fetching with an Effect hook.

## 2.12 - 2.14: [countries](https://github.com/jokerinya/fsopen-part2/tree/main/countries)

> ## Exercises 2.15.-2.18.

## 2.15: Phonebook step7

Let's return to our phonebook application.

Currently, the numbers that are added to the phonebook are not saved to a backend server. Fix this situation.

## 2.16: Phonebook step8

Extract the code that handles the communication with the backend into its own module by following the example shown earlier in this part of the course material.

## 2.17: Phonebook step9

Make it possible for users to delete entries from the phonebook. The deletion can be done through a dedicated button for each person in the phonebook list. You can confirm the action from the user by using the window.confirm method:
![Window Confirm](./readmeimg/24e.png)

The associated resource for a person in the backend can be deleted by making an `HTTP DELETE` request to the resource's URL. If we are deleting e.g. a person who has the id 2, we would have to make an `HTTP DELETE` request to the URL localhost:3001/persons/2. No data is sent with the request.

You can make an `HTTP DELETE` request with the `axios` library in the same way that we make all of the other requests.

**NB:** You can't use the name `delete` for a variable because it's a reserved word in JavaScript. E.g. the following is not possible:

```js
// use some other name for variable!
const delete = (id) => {
  // ...
}
```

## 2.18\*: Phonebook step10

Change the functionality so that if a number is added to an already existing user, the new number will replace the old number. It's recommended to use the `HTTP PUT` method for updating the phone number.

If the person's information is already in the phonebook, the application can confirm the action from the user:
![Confirm user](./readmeimg/16e.png)

> ## Exercises 2.19.-2.20.

## 2.19: Phonebook step11

Use the improved error message example from part 2 as a guide to show a notification that lasts for a few seconds after a successful operation is executed (a person is added or a number is changed):
![Person added](./readmeimg/27e.png)

## 2.20\*: Phonebook step12

Open your application in two browsers. **If you delete a person in browser 1** a short while before attempting to change the person's phone number in browser 2, you will get the following error message:
![Deleted user](./readmeimg/29b.png)

Fix the issue according to the example shown in promise and errors in part 2. Modify the example so that the user is shown a message when the operation does not succeed. The messages shown for successful and unsuccessful events should look different:
![Error](./readmeimg/28e.png)

**Note** that even if you handle the exception, the error message is printed to the console.

---

This was the last exercise of this part of the course. It's time to push your code to GitHub and mark all of your finished exercises to the exercise [submission system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen).
