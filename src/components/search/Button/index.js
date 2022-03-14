import React from "react";

import styles from "./button.module.css";

export const Button = props => {
  const classNames = [styles.button];

  if (props.highlight) {
    classNames.push(styles.highlight);
  }

  return (
    <div className={classNames.join(" ")} onClick={props.onClick}>
      <div className={styles.tag}>{props.children}</div>
    </div>
  );
};
