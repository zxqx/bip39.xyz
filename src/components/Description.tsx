import { useSpring, animated } from 'react-spring';

export default () => {
  const animationProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  return (
    <animated.div style={animationProps}>
      <p className="description">
        Generate a <strong>mnemonic phrase</strong> for your wallet from an audio recording.
      </p>
    </animated.div>
  );
};
