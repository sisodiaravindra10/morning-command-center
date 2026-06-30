import React from 'react';
import {Composition, continueRender, delayRender} from 'remotion';
import {FPS, HEIGHT, WIDTH} from './theme';
import {fontsReady} from './fonts';
import {ProductOverview} from './compositions/ProductOverview';
import {AiStates} from './compositions/AiStates';
import {Orchestration} from './compositions/Orchestration';

// Gate first render until brand fonts are ready, so type is never mis-measured.
const handle = delayRender('Loading brand fonts');
fontsReady.then(() => continueRender(handle)).catch(() => continueRender(handle));

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="productOverview"
        component={ProductOverview}
        durationInFrames={1410}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="aiStates"
        component={AiStates}
        durationInFrames={840}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="orchestration"
        component={Orchestration}
        durationInFrames={780}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
