interface Props {
  phrase: string;
}

export default ({ phrase }: Props) => (
  <div className="mnemonic">
    <p>{phrase}</p>
  </div>
);
