import { useState, useMemo, useCallback } from 'react';
import { entropyToMnemonic } from 'bip39/bip39';
import { sha256 } from 'js-sha256';
import { useSpring, animated } from 'react-spring';
import AudioRecorder, { RecordState } from '../../lib/audio-react-recorder/dist/index.modern';
import Container from './Container';
import Mnemonic from './Mnemonic';
import ActionButton from './ActionButton';
import RerecordButton from './RerecordButton';
import MicrophoneError from './MicrophoneError';
import Footer from './Footer';
import renderAnimation from '../constants/renderAnimation';
import { ValueOf } from '../utils/valueOf';

export default () => {
  const [isMicrophoneAccessGranted, setIsMicrophoneAccessGranted] = useState(false);
  const [hasMicrophoneError, setHasMicrophoneError] = useState(false);
  const [recordingState, setRecordingState] = useState<ValueOf<typeof RecordState>>(RecordState.STOP);
  const [mnemonic, setMnemonic] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const startRecording = useCallback(() => {
    setMnemonic('');
    setRecordingState(RecordState.START);
  }, []);

  const stopRecording = useCallback(() => {
    setRecordingState(RecordState.STOP);
  }, []);

  const onStopRecording = useCallback(async (recording) => {
    setIsProcessing(true);
    const audioData = await recording.blob.arrayBuffer();
    const entropyInput = new Int32Array(audioData).slice(20);
    const mnemonic = entropyToMnemonic(sha256(entropyInput));
    setMnemonic(mnemonic);
    setIsProcessing(false);
  }, []);

  const isRecording = useMemo(() =>
    isMicrophoneAccessGranted && recordingState === RecordState.START,
    [isMicrophoneAccessGranted, recordingState]
  );

  const isInInitialState = useMemo(() =>
    !isRecording && !isProcessing && !mnemonic && !hasMicrophoneError,
    [isRecording, isProcessing, mnemonic, hasMicrophoneError]
  );

  const animationProps = useSpring(renderAnimation);

  const isWaveformVisible = useMemo(() =>
    isRecording && !mnemonic,
    [isRecording, !mnemonic]
  );

  const microphoneErrorAnimationProps = useSpring({
    opacity: hasMicrophoneError ? 1 : 0,
    display: hasMicrophoneError ? 'block' : 'none'
  });

  const waveformAnimationProps = useSpring({
    opacity: isWaveformVisible ? 1 : 0,
    display: isWaveformVisible ? 'block' : 'none'
  });

  return (
    <animated.div style={animationProps}>
      <Container>
        <animated.div style={waveformAnimationProps}>
          <AudioRecorder
            state={recordingState}
            onMicrophoneAccessGranted={() => setIsMicrophoneAccessGranted(true)}
            onStop={onStopRecording}
            onError={() => setHasMicrophoneError(true)}
            canvasHeight={200}
            foregroundColor="#eb4ca8"
            backgroundColor="#0d0620"
          />
        </animated.div>

        {isInInitialState && (
          <p className="description">
            Generate a <strong>BIP39 mnemonic phrase</strong><br />from an audio recording.
          </p>
        )}

        <animated.div style={microphoneErrorAnimationProps}>
          <MicrophoneError />
        </animated.div>

        <Mnemonic phrase={mnemonic} />

        <ActionButton
          isRecording={isRecording}
          isProcessing={isProcessing}
          start={startRecording}
          stop={stopRecording}
          mnemonic={mnemonic}
        />
      </Container>

      <Footer>
        {mnemonic && (
          <RerecordButton start={startRecording} />
        )}
      </Footer>
    </animated.div>
  );
}
