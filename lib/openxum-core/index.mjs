import Core from './openxum/index.mjs';
import Games from './games/index.mjs';

let OpenXum = Core;

OpenXum = Object.assign(OpenXum, Games);

export default OpenXum;