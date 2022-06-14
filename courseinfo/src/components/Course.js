import React from 'react';
import Header from './Header';

const Content = ({ parts }) => {
    // loop all content parts
    return parts.map((part) => <Part key={part.id} part={part} />);
};

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
);

const Total = ({ parts }) => {
    const totalExercises = parts.reduce(
        (sum, currentObj) => sum + currentObj.exercises,
        0
    );

    return <h3>total of exercises {totalExercises}</h3>;
};

const Course = ({ course }) => {
    return (
        <>
            <Header text={course.name} El='h2' />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
};

export default Course;
