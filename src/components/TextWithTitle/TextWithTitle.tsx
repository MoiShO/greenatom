import React from "react";
import styles from './TextWithTitle.module.css';

interface ITextWithTitle {
  title?: string;
  text?: string;
}

export const TextWithTitle = ({ title, text }: ITextWithTitle) => {
  return (
    <div className={styles.wrapper_text_with_title}>
      <span className={styles.wrapper_text_with_title_title}>
        {title}
      </span>
      <span className={styles.wrapper_text_with_title_text}>
        {text}
      </span>
    </div>
  );
}