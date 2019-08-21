import create, { render } from '@verndale/core';
import React from 'react';
import ReactDom from 'react-dom';

const components = [
  {
    name: 'Accordion',
    loader: () => import('./accordion/Accordion'),
    render(Accordion, el) {
      const config = require('./accordion/accordion.config');

      render(el, accordion => {
        ReactDom.render(<Accordion{...accordion.dataset} config={config}/>, accordion);
      });
    }
  }
];


document.addEventListener('DOMContentLoaded', () => {
  create(components);
});
