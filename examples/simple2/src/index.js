import React from 'react';
import ReactDom from 'react-dom';
const root = document.getElementById("root");
console.log("TEST");
const App = () => {
    return (
        <h1>Hello from React 3</h1>
    )
}
ReactDom.render(<App />, root)