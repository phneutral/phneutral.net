// noinspection ES6UnusedImports

import '@viur/shoelace/dist/themes/light.css';
//import '@viur/shoelace/dist/themes/viur.css';
//import '@viur/shoelace/dist/components/alert/alert.js';
//import '@viur/shoelace/dist/components/breadcrumb/breadcrumb.js';
//import '@viur/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js';
//import '@viur/shoelace/dist/components/button/button.js';
//import '@viur/shoelace/dist/components/details/details.js';
import '@viur/shoelace/dist/components/icon/icon.js'; // For SlSelect, SlAlert
//import '@viur/shoelace/dist/components/menu/menu.js'; // For SlSelect
//import '@viur/shoelace/dist/components/menu-item/menu-item.js';
import '@viur/shoelace/dist/components/tooltip/tooltip.js';
//import '@viur/shoelace/dist/components/include/include.js';
//import '@viur/shoelace/dist/components/card/card.js';

// Form-elements
//import "@viur/shoelace/dist/components/divider/divider.js";
//import "@viur/shoelace/dist/components/input/input.js";
//import "@viur/shoelace/dist/components/textarea/textarea.js";
//import '@viur/shoelace/dist/components/checkbox/checkbox.js';

import {setBasePath} from '@viur/shoelace/dist/utilities/base-path.js';
import {registerIconLibrary} from '@viur/shoelace/dist/utilities/icon-library.js';

// Set the base path to the folder you copied Shoelace's assets to
setBasePath('static/shoelace');

// Register a custom icon repository for this app
registerIconLibrary('ph', {
     resolver: name => `static/svgs/${name}.svg`,
     // resolver: name => `/static/shoelace/assets/icons/${name}.svg`,
     mutator: svg => svg.setAttribute('fill', 'currentColor'),
})


