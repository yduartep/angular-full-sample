// import the required animation functions from the angular animations module
import {trigger, state, animate, transition, style} from '@angular/animations';

export const fadeInwAnimation =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('fadeInwAnimation', [


    // end state styles for route container (host)
    state('*', style({
      // the view covers the whole screen with a semi tranparent background
      opacity: 1
    })),

    // route 'enter' transition
    transition(':enter', [

      // styles at start of transition
      style({
        // start with the content positioned off the right of the screen,
        opacity: 0
      }),

      // animation and styles at end of transition
      animate('.5s ease-in-out', style({
        // transition the right position to 0 which slides the content into view
        opacity: 1,
        // transition the background opacity to 0.8 to fade it in
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }))
    ]),
  ]);
