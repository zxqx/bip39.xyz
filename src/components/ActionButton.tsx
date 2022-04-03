import { useState, useEffect, useMemo } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useMediaQuery } from 'react-responsive';
import {
  FaCircle as RecordIcon,
  FaStop as StopIcon,
  FaClipboard as CopyIcon,
} from 'react-icons/fa';
import useHover from '../hooks/useHover';
import { isSafari } from '../utils/browser';

interface Props {
  isRecording: boolean;
  isProcessing: boolean;
  start: () => void;
  stop: () => void;
  mnemonic: string;
}

export default ({ isRecording, isProcessing, start, stop, mnemonic }: Props) => {
  const { onMouseEnter, onMouseLeave, hoverClasses } = useHover();
  const [copied, setCopied] = useState(false);

  const isXSmallViewport = useMediaQuery({
    query: '(max-width: 400px)',
  });

  const onClick = useMemo(() => {
    if (isRecording || isProcessing) {
      return stop;
    }

    if (!isRecording && !isProcessing && !mnemonic) {
      return start;
    }

    if (mnemonic) {
      return () => {};
    }
  }, [isRecording, isProcessing, mnemonic, start, stop]);

  const isInInitialState = useMemo(() => !isRecording && !isProcessing && !mnemonic, [
    isRecording,
    isProcessing,
    mnemonic,
  ]);

  useEffect(() => {
    setCopied(false);
  }, [mnemonic]);

  return (
    <CopyToClipboard
      text={mnemonic ? mnemonic : isSafari() ? ' ' : ''}
      onCopy={() => mnemonic && setCopied(true)}
    >
      <button
        onClick={onClick}
        className={`${mnemonic && 'copy-button'} ${hoverClasses}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isInInitialState && (
          <>
            <RecordIcon className="record-icon" size={14} />
            <span className="button-text">Record</span>
          </>
        )}

        {(isRecording || isProcessing) && (
          <>
            <StopIcon className="stop-icon" size={14} />
            <span className="button-text">Stop</span>
          </>
        )}

        {mnemonic && (
          <>
            <CopyIcon size={14} />

            <span className="button-text">
              {copied ? 'Copied!' : isXSmallViewport ? 'Copy' : 'Copy to clipboard'}
            </span>
          </>
        )}
      </button>
    </CopyToClipboard>
  );
};
