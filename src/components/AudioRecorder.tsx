import { useState, useMemo, useCallback } from 'react';
import { entropyToMnemonic } from 'bip39/bip39';
import { sha256 } from 'js-sha256';
import { FaExclamationCircle as WarningIcon } from 'react-icons/fa';
import AudioRecorder, { RecordState } from '../../lib/audio-react-recorder/dist/index.modern';
import Container from './Container';
import Mnemonic from './Mnemonic';
import RecordButton from './RecordButton';
import CopyToClipboardButton from './CopyToClipboardButton';
import RerecordButton from './RerecordButton';
import { ValueOf } from '../utils/valueOf';

export default () => {
  const [isMicrophoneAccessGranted, setIsMicrophoneAccessGranted] = useState(false);
  const [hasMicrophoneError, setHasMicrophoneError] = useState(false);
  const [recordingState, setRecordingState] = useState<ValueOf<typeof RecordState>>(RecordState.STOP);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const startRecording = useCallback(() => {
    setMnemonic(null);
    setRecordingState(RecordState.START);
  }, []);

  const stopRecording = useCallback(() => {
    setRecordingState(RecordState.STOP);
  }, []);

  const onStopRecording = useCallback(async (audioData) => {
    setIsProcessing(true);
    const arrayBuffer = await audioData.blob.arrayBuffer();
    const entropyInput = new Int32Array(arrayBuffer).slice(20);
    const mnemonic = entropyToMnemonic(sha256(entropyInput));
    setMnemonic(mnemonic);
    setIsProcessing(false);
  }, []);

  const isRecording = useMemo(() =>
    isMicrophoneAccessGranted && recordingState === RecordState.START,
    [isMicrophoneAccessGranted, recordingState]
  );

  return (
    <>
      <Container>
        <div className={isRecording && !mnemonic ? 'visible' : 'hidden'}>
          <AudioRecorder
            state={recordingState}
            onMicrophoneAccessGranted={() => setIsMicrophoneAccessGranted(true)}
            onStop={onStopRecording}
            onError={() => setHasMicrophoneError(true)}
            canvasHeight={200}
            foregroundColor="#6804ff"
            backgroundColor="#1d1342"
          />
        </div>

        {!isRecording && !isProcessing && !mnemonic && !hasMicrophoneError && (
          <p>
            Generate a <strong>BIP39 mnemonic phrase</strong> from<br />an audio recording.
          </p>
        )}

        {hasMicrophoneError && (
          <div className="microphone-error">
            <WarningIcon size={90} color="#ff3458" />
            <p>
              Check the <strong>Microphone</strong> permissions in your browser settings and try again.
            </p>
          </div>
        )}

        {!mnemonic && (
          <RecordButton
            isRecording={isRecording}
            isProcessing={isProcessing}
            start={startRecording}
            stop={stopRecording}
          />
        )}

        {mnemonic && (
          <>
            <Mnemonic phrase={mnemonic} />
            <CopyToClipboardButton text={mnemonic} />
          </>
        )}
      </Container>

      <div className="footer">
        {mnemonic && (
          <RerecordButton start={startRecording} />
        )}
      </div>
    </>
  );
}
