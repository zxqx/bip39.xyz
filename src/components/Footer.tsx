interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => (
  <div className="footer">{children}</div>
);
