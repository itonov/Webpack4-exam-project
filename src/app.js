import './main';
import './penguin';
import './dragon';
import testScript from "./test-file";
import $ from 'jquery';
import 'svg-inline-loader?classPrefix!././cake'

testScript();

class Foo {
    constructor(name) {
        this.name = name;
    }
}

console.log(new Foo('pesho').name);

(function ($) {
    $(document).ready(function () {
        const toggleButton = $("#toggle-penguin");

        toggleButton.click(function () {
            const penguinImg = $("#penguin-img");
            const penguinIsVisible = penguinImg.css("display") === 'inline';
            const penguinBackText = $("#hidden-text");
            const penguinAnnouncementText = $("#shown-text");

            if (penguinIsVisible) {
                penguinImg.css("display", "none");
                penguinBackText.css("display", "block");
                penguinAnnouncementText.css("display", "none");
                toggleButton.html('Show the penguin!');
            } else {
                penguinImg.css("display", "inline");
                penguinBackText.css("display", "none");
                penguinAnnouncementText.css("display", "block");
                toggleButton.html('Hide it!');
            }
        });
    })
})($);
