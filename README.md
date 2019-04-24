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

Use the IIFE file in the `dist` directory or the ES module in the `lib` directory.

When you instantiate, pass an array of DOM elements as the items prop. Like this:

```js
const container = document.getElementById('MyCarousel');
const carousel = new MultiCarousel({
  target: container,
  props: {
    items: [...container.children],
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
});

// Programmatic slide triggering.
carousel.previous();
carousel.next();

// Stop and start the carousel.
carousel.pause();
carousel.start();
```

## Made with Svelte

It's made with [Svelte](https://svelte.dev/).

## Icon Credits

Icons were provided by [Font Awesome](http://fontawesome.io/) and [Font-Awesome-SVG-PNG](https://github.com/encharm/Font-Awesome-SVG-PNG).
