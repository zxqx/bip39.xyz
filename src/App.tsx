// @ts-nocheck
import { useState, useCallback } from 'react';
import { entropyToMnemonic} from 'bip39/bip39';
import { FaCircle as RecordIcon, FaStop as StopIcon, FaClipboard as CopyIcon } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AudioReactRecorder, { RecordState } from '../lib/audio-react-recorder/dist/index.modern';
import { sha256 } from 'js-sha256';

export default () => {
  const [recordState, setRecordState] = useState<string>(RecordState.NONE);
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [mnemonicCopied, setMnemonicCopied] = useState(false);

  const startRecording = useCallback(() => {
    setRecordState(RecordState.START);
  }, []);

  const stopRecording = useCallback(() => {
    setRecordState(RecordState.STOP);
  }, [])

  const resetRecording = useCallback(() => {
    setRecordState(RecordState.NONE);
    setMnemonic(null);
    setMnemonicCopied(false);
  }, [])

  const onStopRecording = useCallback(async (audioData) => {
    const arrayBuffer = await audioData.blob.arrayBuffer();
    const entropy = new Int32Array(arrayBuffer).slice(20);
    const mnemonic = entropyToMnemonic(sha256(entropy));
    setMnemonic(mnemonic);
  }, []);

  return (
    <>
      <h1>bip39.xyz</h1>
      <div className="container">

        {!mnemonic && (
          <>
            <div className={`${recordState === RecordState.NONE ? 'hidden' : 'visible'}`}>
              <AudioReactRecorder state={recordState} onStop={onStopRecording} foregroundColor="#7237cc" backgroundColor="#fff" canvasHeight={250} />
            </div>

            {recordState === RecordState.NONE && (
              <p className="description">Generate a BIP39 mnemonic phrase from an audio recording</p>
            )}

            <button
              onClick={
                recordState === RecordState.STOP || recordState === RecordState.NONE ?
                startRecording :
                stopRecording
              }
            >
              {recordState === RecordState.STOP || recordState === RecordState.NONE ?
                <>
                  <RecordIcon size={16} />
                  <span className="button-text">Record</span>
                </>
                :
                <>
                  <StopIcon size={16} />
                  <span className="button-text">Stop</span>
                </>
              }
            </button>
          </>
        )}

        {mnemonic && (
          <>
            <CopyToClipboard
              text={mnemonic}
              onCopy={() => setMnemonicCopied(true)}
            >
            <button className="copy-button">
              <CopyIcon size={16} />
              <span className="button-text">
                {mnemonicCopied ? 'Copied!' : 'Copy to clipboard'}
              </span>
            </button>

            </CopyToClipboard>

            <div className="mnemonic">
              {mnemonic}
            </div>
          </>
        )}
      </div>

      <div className="footer">
        {mnemonic && (
          <a
            href="#"
            className="reset-link"
            onClick={(e) => {
              e.preventDefault();
              resetRecording();
            }}
          >
            Record another?
          </a>
        )}
      </div>
    </>
  );
}
