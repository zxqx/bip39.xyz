import { useState, useEffect, useMemo } from 'react';

interface Props {
  score: number;
  crackTime: number | string;
}

const STRENGTHS = ['Extremely Weak', 'Very Weak', 'Too Weak', 'Weak', 'Very Strong'];

export default ({ score, crackTime }: Props) => {
  const [isProcessed, setIsProcessed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const strength = useMemo(() => {
    if (score === 4) {
      return 'strong';
    }

    if (score === 2 || score === 3) {
      return 'weak';
    }

    return 'very-weak';
  }, [score]);

  useEffect(() => {
    setTimeout(() => {
      setIsProcessed(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isProcessed) {
      setTimeout(() => {
        setIsMounted(true);
      }, 0);
    }
  }, [isProcessed]);

  return (
    <div className="strength-indicator-container">
      <div
        className={`strength-indicator-processing ${
          !isMounted && 'strength-indicator-processing-visible'
        } : ''`}
      >
        Processing...
      </div>

      <div
        className={`strength-indicator-content ${
          isMounted ? 'strength-indicator-content-visible' : ''
        }`}
      >
        <div className="strength-indicator-label">
          <strong>{STRENGTHS[score]}</strong>
        </div>

        <div
          className={`strength-indicator strength-indicator-strength-${score} ${
            isMounted ? `strength-indicator-${strength}` : ''
          }`}
        >
          {new Array(5).fill(undefined).map((_, index) => (
            <div
              key={index}
              className={`strength-indicator-bar ${
                index <= score ? 'strength-indicator-bar-filled' : ''
              }`}
            ></div>
          ))}
        </div>

        <div className="strength-indicator-details">
          This mnemonic phrase would take <strong>{crackTime}</strong> to crack at 10 billion
          guesses per second.
        </div>
      </div>
    </div>
  );
};
