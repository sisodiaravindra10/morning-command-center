/**
 * Brand fonts via @remotion/google-fonts. Loaded once, waited on in Root
 * via delayRender so text is never measured before the faces are ready.
 */
import {loadFont as loadHost} from '@remotion/google-fonts/HostGrotesk';
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

export const host = loadHost('normal', {weights: ['400', '500', '600', '700']});
export const inter = loadInter('normal', {weights: ['400', '500', '600', '700']});
export const mono = loadMono('normal', {weights: ['400', '500', '600']});

export const fontsReady = Promise.all([
  host.waitUntilDone(),
  inter.waitUntilDone(),
  mono.waitUntilDone(),
]);
