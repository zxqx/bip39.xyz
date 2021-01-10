interface Props {
  phrase: string;
}

export default ({ phrase }: Props) => (
  <div className="mnemonic">
    {phrase}
  </div>
);
