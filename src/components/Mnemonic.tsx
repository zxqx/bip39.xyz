import { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import Scrambler from 'scrambling-letters';

interface Props {
  phrase: string;
}

export default ({ phrase }: Props) => {
  const animationProps = useSpring({
    opacity: phrase ? 1 : 0,
  });

  useEffect(() => {
    Scrambler({
      target: '.mnemonic-phrase',
      random: [500, 1500],
      speed: 100,
      text: phrase,
    });
  }, [phrase]);

  return (
    <animated.div style={animationProps}>
      <div className="mnemonic">
        {phrase && (
          <>
            <h2>Mnemonic phrase</h2>

            <p className="mnemonic-phrase"></p>
          </>
        )}
      </div>
    </animated.div>
  );
};
