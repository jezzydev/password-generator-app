# Frontend Mentor - Password generator app solution

This is a solution to the [Password generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Frontend Mentor](https://www.frontendmentor.io/solutions/password-generator-app-with-javascript-tGXMl2NpYd)
- Live Site URL: [Password Gen](https://jezzydev.github.io/password-generator-app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- JavaScript

### What I learned

To fake a placeholder in a non-input element such as <p>:

- Add a data attritube to the element to hold the placeholder text.

```html
<p class="Password__value" data-placeholder="P4$5W0rD!"></p>
```

Then in CSS, use pseudo-class empty and pseudo-element before to generate a content only if the element is empty.
Use attr() to get the placeholder text from the data-attribute and assign to the content property.

```css
.Password__value:empty::before {
  content: attr(data-placeholder);
  color: var(--color-grey-700);
}
```

To generate a random password, prepare the pool of characters depending on the settings selected by the user.
Then use Math.random() to generate a pseudo-random number as initial seed, to select a character from the pool.

```js
function getPasswordSettings() {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const number = "1234567890";
  const symbol = "!\"#$%'()*+,-./:;<=>?@[\\]^_`";

  let str = "";
  let complexCnt = 0;

  if (includeUppercase.checked) {
    str += uppercase;
    complexCnt++;
  }

  if (includeLowercase.checked) {
    str += lowercase;
    complexCnt++;
  }

  if (includeNumbers.checked) {
    str += number;
    complexCnt++;
  }

  if (includeSymbols.checked) {
    str += symbol;
    complexCnt++;
  }

  const settings = {
    complexityCount: complexCnt,
    characterPool: str,
  };

  return settings;
}

function generatePassword(length, str) {
  let password = "";

  if (str.length > 0) {
    for (let i = 1; i <= length; i++) {
      const index = getRandomInt(0, str.length);
      password += str[index];
    }
  }

  return password;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
```

### Continued development

Work on challenges that include:

- UI components I haven't encountered
- Forms, validation
- Challenging layouts

### Useful resources

- [Range Slider](https://codepen.io/jzio/pen/EaVyWZx) - Good example of how to customize range sliders.
- [CSS Tricks:nth-child](https://css-tricks.com/almanac/pseudo-selectors/n/nth-child/) - Good resource to understand how nth-child pseudo-selector works.
- [MDN](https://developer.mozilla.org/en-US/docs/Web) - Quick search on how to use Math.random().

## Author

- Website - [jezzydev](https://github.com/jezzydev)
- Frontend Mentor - [@jezzydev](https://www.frontendmentor.io/profile/jezzydev)
