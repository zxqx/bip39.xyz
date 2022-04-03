import { forwardRef } from 'react';

interface Props {
  isVisible: boolean;
  children: React.ReactNode;
}

export default forwardRef(
  ({ isVisible, children }: Props, ref: React.ForwardedRef<HTMLDivElement>) => (
    <div className="container" ref={ref}>
      <div className={`container-border ${isVisible && 'visible'}`}></div>
      {children}
    </div>
  )
);
