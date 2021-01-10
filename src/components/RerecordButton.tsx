interface Props {
  start: () => void;
}

export default ({ start }: Props) => (
  <a
    href="#"
    className="rerecord-button"
    onClick={(e) => {
      e.preventDefault();
      start();
    }}
  >
    Record another?
  </a>
);
