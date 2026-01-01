import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Halsey Tyler</h1>
        <p className={styles.description}>
          Studying computer science with experience developing full-stack applications and software. 
          Reach out if you'd like to learn more!
        </p>
      </div>
      <img
        src={getImageUrl("hero/9E5E532F-1A26-4D1C-B9A7-0BB82EC2BCC3_1_105_c.jpeg")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
