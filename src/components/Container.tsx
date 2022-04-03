import { forwardRef } from 'react';

interface Props {
  isVisible: boolean;
  isProcessed: boolean;
  children: React.ReactNode;
}

export default forwardRef(
  ({ isVisible, isProcessed, children }: Props, ref: React.ForwardedRef<HTMLDivElement>) => (
    <div className={`container ${isProcessed ? 'container-processed' : ''}`} ref={ref}>
      <div className={`container-border ${isVisible ? 'container-border-visible' : ''}`}></div>
      {children}
    </div>
  )
);
