import { useState } from 'react';
import { FaClipboard as CopyIcon } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface Props {
  text: string;
}

export default ({ text }: Props) => {
  const [copied, setCopied] = useState(false);

  return (
    <CopyToClipboard
      text={text}
      onCopy={() => setCopied(true)}
    >
      <button className="copy-button">
        <CopyIcon size={16} />
        <span className="button-text">
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </span>
      </button>
    </CopyToClipboard>
  );
};
