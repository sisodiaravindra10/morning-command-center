import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
// h264 1080p, high quality but reasonable file size.
Config.setCodec('h264');
Config.setCrf(18);
