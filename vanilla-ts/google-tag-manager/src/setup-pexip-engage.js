import { scriptSrc } from './pexip-engage-script.js';

const script = document.createElement('script');
script.async = true;
script.defer = true;
script.src = scriptSrc;

document.body.appendChild(script);
