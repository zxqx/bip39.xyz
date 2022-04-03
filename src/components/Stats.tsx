import { useMemo } from 'react';

interface Props {
  score: number;
  crackTime: number | string;
}

const STRENGTHS = ['Extremely Weak', 'Very Weak', 'Too Weak', 'Weak', 'Very Strong'];

export default ({ score, crackTime }: Props) => {
  const strength = useMemo(() => {
    if (score === 4) {
      return 'strong';
    }

    if (score === 2 || score === 3) {
      return 'weak';
    }

    return 'very-weak';
  }, [score]);

  return (
    <div className="stats">
      <div className="stats-label">
        <strong>{STRENGTHS[score]}</strong>
      </div>

      <div className={`strength-indicator strength-indicator-${strength}`}>
        {new Array(5).fill(undefined).map((_, index) => (
          <div
            key={index}
            className={`strength-indicator-bar ${index <= score ? 'filled' : ''}`}
          ></div>
        ))}
      </div>

      <div className="stats-details">This mnemonic phrase would take {crackTime} to crack.</div>
    </div>
  );
};
