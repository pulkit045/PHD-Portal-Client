const SvgIcon = (props) => (
  <img
    src={`/images/${props.src}`}
    alt={props.alt || "IIIT Lucknow Ph.D Portal by RDT and team."}
    className={props.classname || "svg-icon"}
  />
);

export default SvgIcon;
