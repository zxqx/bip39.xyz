import { useState, useMemo, useCallback } from 'react';
import { entropyToMnemonic } from 'bip39/bip39';
import { sha256 } from 'js-sha256';
import useDimensions from 'react-use-dimensions';
import zxcvbn from 'zxcvbn';
import { useSpring, animated } from 'react-spring';
import AudioRecorder, { RecordState } from '../../lib/audio-react-recorder/dist/index.modern';
import Container from './Container';
import Description from './Description';
import Mnemonic from './Mnemonic';
import StrengthIndicator from './StrengthIndicator';
import ActionButton from './ActionButton';
import DownloadArchiveButton from './DownloadArchiveButton';
import ViewSourceCodeButton from './ViewSourceCodeButton';
import RerecordButton from './RerecordButton';
import MicrophoneError from './MicrophoneError';
import Footer from './Footer';
import renderAnimation from '../constants/renderAnimation';
import { ValueOf } from '../types/ValueOf';

export default () => {
  const [containerRef, { width: containerWidth }] = useDimensions();
  const [isMicrophoneAccessGranted, setIsMicrophoneAccessGranted] = useState(false);
  const [hasMicrophoneError, setHasMicrophoneError] = useState(false);
  const [isRecordingCancelled, setIsRecordingCancelled] = useState(false);
  const [recordingState, setRecordingState] = useState<ValueOf<typeof RecordState>>(
    RecordState.STOP
  );
  const [mnemonic, setMnemonic] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [entropyScore, setEntropyScore] = useState<number | null>(null);
  const [crackTime, setCrackTime] = useState<string | number | null>(null);

  const reset = useCallback(() => {
    setMnemonic('');
    setEntropyScore(null);
    setCrackTime(null);
    setIsRecordingCancelled(true);

    if (!hasMicrophoneError) {
      stopRecording();
    }
  }, [hasMicrophoneError]);

  const startRecording = useCallback(() => {
    setMnemonic('');
    setEntropyScore(null);
    setCrackTime(null);
    setIsRecordingCancelled(false);
    setRecordingState(RecordState.START);
  }, []);

  const stopRecording = useCallback(() => {
    setRecordingState(RecordState.STOP);
  }, []);

  const onStopRecording = useCallback(
    async (recording) => {
      if (isRecordingCancelled) {
        return false;
      }

      setIsProcessing(true);
      const audioData = await recording.blob.arrayBuffer();
      const entropyInput = new Int32Array(audioData).slice(20);
      const entropy = sha256(entropyInput);
      const entropyStats = zxcvbn(entropy);
      const mnemonic = entropyToMnemonic(entropy);
      setMnemonic(mnemonic);
      setEntropyScore(entropyStats.score);
      setCrackTime(entropyStats.crack_times_display.offline_fast_hashing_1e10_per_second);
      setIsProcessing(false);
    },
    [isRecordingCancelled]
  );

  const isRecording = useMemo(
    () => isMicrophoneAccessGranted && !hasMicrophoneError && recordingState === RecordState.START,
    [isMicrophoneAccessGranted, hasMicrophoneError, recordingState]
  );

  const isInInitialState = useMemo(
    () => !isRecording && !isProcessing && !mnemonic && !hasMicrophoneError,
    [isRecording, isProcessing, mnemonic, hasMicrophoneError]
  );

  const animationProps = useSpring(renderAnimation);

  const isWaveformVisible = useMemo(() => (isRecording || isProcessing) && !mnemonic, [
    isRecording,
    isProcessing,
    !mnemonic,
  ]);

  const microphoneErrorAnimationProps = useSpring({
    opacity: hasMicrophoneError ? 1 : 0,
    display: hasMicrophoneError ? 'block' : 'none',
  });

  const waveformAnimationProps = useSpring({
    opacity: isWaveformVisible ? 1 : 0,
    display: isWaveformVisible ? 'block' : 'none',
  });

  return (
    <>
      <animated.div style={animationProps}>
        <h1>
          <span onClick={() => reset()}>
            bip39<span className="tld">.xyz</span>
          </span>
        </h1>
      </animated.div>

      <animated.div style={animationProps}>
        <Container ref={containerRef} isVisible={isRecording} isProcessed={!!mnemonic}>
          <animated.div style={waveformAnimationProps}>
            <div
              className="audio-recorder-container"
              style={{ width: containerWidth ? containerWidth - 90 : 'auto' }}
            >
              <AudioRecorder
                state={recordingState}
                onMicrophoneAccessGranted={() => setIsMicrophoneAccessGranted(true)}
                onMicrophoneAccessRejected={() => setIsMicrophoneAccessGranted(true)}
                onStop={onStopRecording}
                onError={() => setHasMicrophoneError(true)}
                canvasWidth={500}
                canvasHeight={200}
                foregroundColor="#eb4ca8"
                backgroundColor="#0d0620"
              />
            </div>
          </animated.div>

          {isInInitialState && <Description />}

          <animated.div style={microphoneErrorAnimationProps}>
            <MicrophoneError />
          </animated.div>

          <Mnemonic phrase={mnemonic} />

          {entropyScore && crackTime && (
            <StrengthIndicator score={entropyScore} crackTime={crackTime} />
          )}

          <ActionButton
            isRecording={isRecording}
            isProcessing={isProcessing}
            start={startRecording}
            stop={stopRecording}
            mnemonic={mnemonic}
          />
        </Container>

        <Footer>
          <div className="main-footer">
            {!mnemonic && window.location.href.startsWith('http') && <DownloadArchiveButton />}
            {!mnemonic && <ViewSourceCodeButton />}
          </div>
          {mnemonic && <RerecordButton start={startRecording} />}
        </Footer>
      </animated.div>
    </>
  );
};
