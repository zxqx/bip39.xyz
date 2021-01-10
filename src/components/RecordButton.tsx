import { FaCircle as RecordIcon, FaStop as StopIcon } from 'react-icons/fa';

interface Props {
  isRecording: boolean;
  start: () => void;
  stop: () => void;
}

export default ({
  isRecording,
  start,
  stop
}: Props) => (
  <button onClick={isRecording ? stop : start}>
    {isRecording ?
      <>
        <StopIcon size={16} />
        <span className="button-text">Stop</span>
      </>
      :
      <>
        <RecordIcon size={16} />
        <span className="button-text">Record</span>
      </>
    }
  </button>
);
