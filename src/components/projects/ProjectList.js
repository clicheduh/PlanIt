import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';

const ProjectList = (props) => {
    const { projects } = props;
    const projectsFromStore = projects ? (
        projects.map((project) => {
            return (
                <Link to={'/projects/' + project.id} key={project.id}>
                    <ProjectSummary project={project} />
                </Link>
            );
        })
    ) : (
        <div>No projects left!</div>
    );

    return <div className="project-list section">{projectsFromStore}</div>;
};

export default ProjectList;
