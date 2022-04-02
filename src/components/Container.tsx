import { forwardRef } from 'react';

interface Props {
  children: React.ReactNode;
}

export default forwardRef(({ children }: Props, ref: React.ForwardedRef<HTMLDivElement>) => (
  <div className="container" ref={ref}>
    {children}
  </div>
));
