import { useSpring, animated } from 'react-spring';
import toasty from 'toasty';
import AudioRecorder from './components/AudioRecorder';

const t = toasty();

export default () => {
  const animationProps = useSpring({
    from: {
      opacity: 0,
      marginTop: '0em',
    },
    to: {
      opacity: 1,
      marginTop: '2em',
    }
  });

  return (
    <animated.div style={animationProps}>
      <h1 onClick={() => t.trigger()}>bip39.xyz</h1>
      <AudioRecorder />
    </animated.div>
  );
};
