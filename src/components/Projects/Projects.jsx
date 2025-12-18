import React, { useEffect, useState } from "react";

import styles from "./Projects.module.css";

import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [autoPlayVideo, setAutoPlayVideo] = useState(false);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedProject]);

  const handleSelect = (project) => {
    setSelectedProject(project);
    setAutoPlayVideo(false);
  };

  const handleDemo = (project) => {
    setSelectedProject(project);
    setAutoPlayVideo(true);
  };

  const handleClose = () => {
    setSelectedProject(null);
    setAutoPlayVideo(false);
  };

  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.projects}>
        {projects.map((project, id) => {
          return (
            <ProjectCard
              key={id}
              project={project}
              onSelect={() => handleSelect(project)}
              onDemo={() => handleDemo(project)}
            />
          );
        })}
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleClose}
          autoPlay={autoPlayVideo}
        />
      )}
    </section>
  );
};
