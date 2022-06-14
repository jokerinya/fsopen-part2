import React from 'react';

const Header = ({ text, El }) => {
    // El prop will render element as HTML element
    if (!El) {
        return <h1>{text}</h1>;
    }
    return <El>{text}</El>;
};

export default Header;
