import React from "react";

const EmptyState = ({
  icon,
  title,
  subtitle,
}) => {
  return (
    <div className="empty-sidebar">

      <i className={icon}></i>

      <h5>{title}</h5>

      <p>{subtitle}</p>

    </div>
  );
};

export default EmptyState;