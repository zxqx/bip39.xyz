import { FaExclamationCircle as WarningIcon } from 'react-icons/fa';

export default () => (
  <div className="microphone-error">
    <WarningIcon size={90} color="#ff3458" />
    <p>
      Check the <strong>Microphone</strong> permissions in your browser settings and try again.
    </p>
  </div>
);
