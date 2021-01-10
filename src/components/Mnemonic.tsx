import { useSpring, animated } from 'react-spring';

interface Props {
  phrase: string;
}

export default ({ phrase }: Props) => {
  const animationProps = useSpring({
    opacity: phrase ? 1 : 0
  });

  return (
    <animated.div style={animationProps}>
      <div className="mnemonic">
        <p>{phrase}</p>
      </div>
    </animated.div>
  );
};
