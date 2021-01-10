import { FaCircle as RecordIcon, FaStop as StopIcon } from 'react-icons/fa';

interface Props {
  isRecording: boolean;
  isProcessing: boolean;
  start: () => void;
  stop: () => void;
}

export default ({
  isRecording,
  isProcessing,
  start,
  stop
}: Props) => (
  <button onClick={isRecording ? stop : start}>
    {!isRecording && !isProcessing && (
      <>
        <RecordIcon size={16} />
        <span className="button-text">Record</span>
      </>
    )}

    {isRecording && !isProcessing && (
      <>
        <StopIcon size={16} />
        <span className="button-text">Stop</span>
      </>
    )}
  </button>
);
