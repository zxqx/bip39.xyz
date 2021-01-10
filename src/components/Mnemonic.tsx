interface Props {
  mnemonic: string;
}

export default ({ mnemonic }: Props) => (
  <div className="mnemonic">
    {mnemonic}
  </div>
);
