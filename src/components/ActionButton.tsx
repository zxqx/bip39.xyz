import { useState, useEffect, useMemo } from 'react';
import useHover from '../hooks/useHover';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCircle as RecordIcon, FaStop as StopIcon, FaClipboard as CopyIcon } from 'react-icons/fa';

interface Props {
  isRecording: boolean;
  isProcessing: boolean;
  start: () => void;
  stop: () => void;
  mnemonic: string | null;
}

export default ({
  isRecording,
  isProcessing,
  start,
  stop,
  mnemonic
}: Props) => {
  const { onMouseEnter, onMouseLeave, hoverClasses } = useHover();
  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    setCopied(false);
  }, [mnemonic]);

  return (
    <CopyToClipboard
      text={mnemonic || ''}
      onCopy={() => mnemonic && setCopied(true)}
    >
      <button
        onClick={onClick}
        className={`${mnemonic && 'copy-button'} ${hoverClasses}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {!isRecording && !isProcessing && !mnemonic && (
          <>
            <RecordIcon size={16} />
            <span className="button-text">Record</span>
          </>
        )}

        {(isRecording || isProcessing) && (
          <>
            <StopIcon size={16} />
            <span className="button-text">Stop</span>
          </>
        )}

        {mnemonic && (
          <>
            <CopyIcon size={16} />

            <span className="button-text">
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </span>
          </>
        )}
      </button>
    </CopyToClipboard>
  );
};
