const SvgIcon = (props) => (
  <img
    src={`/images/${props.src}`}
    alt={
      props.alt || "IIIT Lucknow Ph.D Portal by Pulkit,Sarthak,Ankit and team."
    }
    className={props.classname || "svg-icon"}
    height={props.height || "auto"}
  />
);

export default SvgIcon;
