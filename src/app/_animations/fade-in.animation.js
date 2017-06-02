"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import the required animation functions from the angular animations module
var animations_1 = require("@angular/animations");
exports.fadeInAnimation = 
// trigger name for attaching this animation to an element using the [@triggerName] syntax
animations_1.trigger('fadeInAnimation', [
    // end state styles for route container (host)
    animations_1.state('*', animations_1.style({
        // the view covers the whole screen with a semi tranparent background
        opacity: 1
    })),
    // route 'enter' transition
    animations_1.transition(':enter', [
        // styles at start of transition
        animations_1.style({
            // start with the content positioned off the right of the screen,
            opacity: 0
        }),
        // animation and styles at end of transition
        animations_1.animate('.5s ease-in-out', animations_1.style({
            // transition the right position to 0 which slides the content into view
            opacity: 1,
            // transition the background opacity to 0.8 to fade it in
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }))
    ]),
]);
