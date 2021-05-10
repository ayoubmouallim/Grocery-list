import React from "react";

const Alert = ({ alert, removeAlert, list }) => {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);

  return <p className={`alert alert-${alert.type}`}>{alert.msg}</p>;
};

export default Alert;
