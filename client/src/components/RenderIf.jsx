import { Fragment } from "react";

const RenderIf = (props) => {
  const { condition, children } = props;

  if (!condition) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};

export default RenderIf;
