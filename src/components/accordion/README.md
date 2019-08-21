# Accordion

An accordion is a vertically stacked set of elements, such as labels or thumbnails, that allow the user to toggle the display of sections of content.
Each labeling element can be expanded or collapsed to reveal or hide its associated content.
Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.

This component is WAI-ARIA compliant.

## Keyboard interactions
When focus is on a header, the following key commands are available:

* `TAB`: When focus moves into the accordion, places focus on the active `tab` element. When the tab list contains the focus, moves focus to the next element in the tab sequence, which is the `tabpanel` element.
* `UP`: Move focus to the previous header. If on first header, moves focus to last header.
* `DOWN`: Move focus to the next header. If on last header, moves focus to first header.
* `SPACE/ENTER/RETURN`: Open/close a panel associated with focused header.
* `SHIFT + TAB`: Moves focus to the previous focusable element.
* `HOME`: Move focus to the first header.
* `END`: Move focus to the last header.

***

## Instantiation
This component is able to take in _data attributes_ from the root HTML element via `dataset`. This is ideal if you have multiple
accordions on the page that need different functionality.

### React component
**`components/accordion/Accordion.js`**

The react component **requires** you to pass in a `config` which will tell the component what to render - see **`components/accordion/accordion.config.js`**.

The recommended way is to use _data attributes_ on the root `.accordion` HTML element and pass them in via `dataset`:
```js
import Accordion from './accordion/Accordion';
import config from './accordion/accordion.config';
import { render }  from 'react-dom';

const accordions =  document.querySelectorAll('.accordion');

for(let i = 0; i < accordions.length; i++){
  render(<Accordion
    {...accordions[i].dataset}
    config={config}
  />, accordions[i]);
}
```

Or you can pass in the options individually and bypass the _data attributes_.

```js
...
<Accordion
  active={0}
  collapsible={true}
  multiple={true}
  ...
/>
```

***

## Configuration
**Passing in options in the JavaScript  will override any data attributes on the root HTML element.**


### `data-active`
The zero-based index of the panel that is active (open). If you put a number that's greater than the number panels, or if you put a negative value, this property will do nothing.
#### Type: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
#### Default: `null`

###### Example:
This will render with the first panel open and the rest closed.
```html
<div role="tablist" class="accordion" data-active="0">
```

***

### `data-multiple`
Whether or not to allow multiple panels to be open at the same time.

**<span style="color:red">If `multiple` is set to `true` - `collapsible` will automatically be set to `true`.</span>**
#### Type: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
#### Default: `false`

###### Example:
Allow multiple panels to be open at the same time.
```html
<div role="tablist" class="accordion" data-multiple="true">
```

***

### `data-collapsible`
Whether all the sections can be closed at once. Allows collapsing the active section.

**<span style="color:red">If `multiple` is set to `true` - `collapsible` will automatically be set to `true`.</span>**
#### Type: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
#### Default: `false`

###### Example:
Allows collapsing the active section.
```html
<div role="tablist" class="accordion" data-collapsible="true">
```

***

### `disabled`
Whether or not to disable a single tab or many accordion tabs.
#### Type: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
#### Default: `false`

###### Examples:
Disable an accordion item in the **React component**. Add a `disabled` property to an accordion item and set it to `true`.
```js
context: {
  accordions: [
    {
      title: 'Accordion 1',
      content: '<p>Accordion content 1</p>',
      disabled: true,
      ...
    }
   ]
}
```

Disable an accordion item in the **vanilla component**. Add the `disabled` attribute to the button element.
```html
<button disabled class="accordion__tab__button" id="accordion-title-sktwi557jnf7rhhf" aria-expanded="false" aria-controls="accordion-panel-sktwi557jnf7rhhe" type="button">Accordion 1</button>
```

## Events
The below are event hooks that can be used with the accordion


### `open`
Triggered after a panel has been opened.

| Property        | Type           | Notes  |
| ------------- |-------------| -----|
| `event`      | [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEVent) | The event object |
| `panel`      | [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) | The panel that has been opened |


###### Examples:
Listen for the `open` event in the **React component**
```js
import { render } from 'react-dom';

const accordions =  document.querySelectorAll('.accordion');

for(let i = 0; i < accordions.length; i++){
  const onOpen = (event, panel) => {
    console.log(event, panel);
  };

  render(<Accordion
    config={}
    open={onOpen}
  />, accordions[i]);
}
```

***

### `close`
Triggered after a panel has been closed.

**The `collapsible` option should be set to `true` if you want to capture the close event.**

| Property        | Type           | Notes  |
| ------------- |-------------| -----|
| `event`      | [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEVent) |  The event object |
| `panel`      | [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) | The panel that has been closed |


###### Examples:
Listen for the `close` event in the **React component**
```js
import { render } from 'react-dom';

const accordions =  document.querySelectorAll('.accordion');

for(let i = 0; i < accordions.length; i++){
  const onClose = (event, panel) => {
    console.log(event, panel);
  };

  render(<Accordion
    config={}
    collapsible={true}
    close={onClose}
  />, accordions[i]);
}
```
