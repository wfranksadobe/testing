// eslint-disable-next-line import/no-cycle
import { loadScript, sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
// add more delayed functionality here
const map = document.querySelector('#locator-map');
if (map) {
  loadScript('/blocks/map/location-init.js', { defer: true });
}
