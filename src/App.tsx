import AudioRecorder from './components/AudioRecorder';
import toasty from 'toasty';

const t = toasty();

export default () => (
  <>
    <h1 onClick={() => t.trigger()}>bip39.xyz</h1>
    <AudioRecorder />
  </>
);
