import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import styles from './App.module.css';
const root = document.getElementById("root");

const A = () => {
    return (
        <>
            <h1 className={styles.h1}>Hello from React</h1>
            <App />
        </>
    )
}
ReactDom.render(<A />, root)