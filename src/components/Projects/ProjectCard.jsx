import React from "react";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source },
  onSelect,
  onDemo,
}) => {
  return (
    <article className={styles.card} onClick={onSelect}>
      <img
        src={getImageUrl(imageSrc)}
        alt={`Screenshot of ${title}`}
        className={styles.image}
      />
      <div className={styles.overlay}>
        <div className={styles.skills}>
          {skills.map((skill, id) => (
            <span key={id} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>
        <div className={styles.textBlock}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.action}
            onClick={(e) => {
              e.stopPropagation();
              onDemo?.();
            }}
          >
            Demo
          </button>
          <a
            href={source}
            className={`${styles.action} ${styles.secondary}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
};
