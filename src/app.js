import './main.css';
import testScript from "./test-file";

testScript();
class Foo {
    constructor(name) {
        this.name = name;
    }
}

console.log(new Foo('pesho').name);
