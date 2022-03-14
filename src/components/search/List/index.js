import React from "react";

import styles from "./list.module.css";

export const List = props => {
  const classNames = [styles.item];
  if (props.itemClass) {
    classNames.push(props.itemClass);
  }

  const listItems = props.items.map((item, index) => (
    <li key={index} className={classNames.join(" ")}>
      {item}
    </li>
  ));

  return (
    <div className={styles.container}>
      <ul className={styles.list}>{listItems}</ul>
    </div>
  );
};