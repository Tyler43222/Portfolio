import React, { useEffect, useMemo, useRef } from "react";

import styles from "./ProjectModal.module.css";
import { getImageUrl } from "../../utils";

export const ProjectModal = ({ project, onClose, autoPlay }) => {
  const {
    title,
    imageSrc,
    description,
    longDescription,
    skills = [],
    demo,
    source,
    videoUrl,
  } = project;

  const dialogRef = useRef(null);
  const videoContainerRef = useRef(null);

  const iframeSrc = useMemo(() => {
    if (!videoUrl) return null;
    try {
      const url = new URL(videoUrl);
      if (autoPlay) {
        url.searchParams.set("autoplay", "1");
        
      }
      return url.toString();
    } catch (err) {
      return videoUrl;
    }
  }, [videoUrl, autoPlay]);

  useEffect(() => {
    if (!autoPlay || !videoContainerRef.current) return;
    const dialogEl = dialogRef.current;
    const videoEl = videoContainerRef.current;
    if (dialogEl && videoEl) {
      const offset = videoEl.offsetTop;
      dialogEl.scrollTo({ top: 120, behavior: "smooth" });
    } else {
      videoEl?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [autoPlay]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className={styles.header}>
          <div className={styles.hero}>
            <img
              src={getImageUrl(imageSrc)}
              alt={`Screenshot of ${title}`}
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay} />
          </div>
          <div className={styles.headerContent}>
            <div className={styles.chipRow}>
              {skills.map((skill, id) => (
                <span key={id} className={styles.chip}>
                  {skill}
                </span>
              ))}
            </div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.lead}>{longDescription || description}</p>
            <div className={styles.actions}>
              {source && (
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primary}
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.sectionHeader}>Project Demo</div>
          <div className={styles.videoShell} ref={videoContainerRef}>
            {iframeSrc ? (
              <iframe
                src={iframeSrc}
                title={`${title} demo video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className={styles.videoPlaceholder}>No video provided</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
