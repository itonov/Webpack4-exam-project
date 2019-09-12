import './main.css';
import testScript from "./test-file";

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

testScript();
class Foo {
    constructor(name) {
        this.name = name;
    }
}

console.log(new Foo('pesho').name);

ReactDOM.render(<App/>, document.getElementById('react'));
