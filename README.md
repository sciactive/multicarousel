# MultiCarousel

A dependency free multiple item JavaScript carousel.

## Installation

Install with NPM:

```sh
npm install multicarousel
```

## Demo

Check it out: https://sciactive.github.io/multicarousel/demo/

## Use

Using it requires you to pass in an array of children DOM elements. Like this:

```js
var container = document.getElementById('MyCarousel');
var carousel = new MultiCarousel({
  target: container,
  data: {
    items: Array.prototype.slice.call(container.children),
    // The rest of these are optional. Here are the defaults.
    delay: 1500, // Delay between slides.
    transition: 600, // Duration of slide transition.
    count: 5, // How many items to show at once.
    controls: [ // Which controls are visible.
      'previous',
      'next',
      'pause',
      'start'
    ]
  }
  }
});

// Programmatic slide triggering.
carousel.previous();
carousel.next();

// Stop and start the carousel.
carousel.pause();
carousel.start();
```

## Made with Svelte

It's made with [Svelte](https://svelte.technology/), which means you don't need any library JS. Just use the file in the lib directory.

## Icon Credits

Icons were provided by [Font Awesome](http://fontawesome.io/) and [Font-Awesome-SVG-PNG](https://github.com/encharm/Font-Awesome-SVG-PNG).
