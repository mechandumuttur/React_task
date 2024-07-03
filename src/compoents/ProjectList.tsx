import React, { useState, useEffect } from 'react';
import projectsData from '../data/project.json';
import wbsData from '../data/wbs.json';
import tasksData from '../data/task.json';
import WBSList from './WBSList';

interface Project {
  id: number;
  name: string;
}

interface WBS {
  id: number;
  name: string;
  projectId: number;
}

interface Task {
  id: number;
  name: string;
  projectId: number;
  wbsId: number;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [wbs, setWbs] = useState<WBS[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);

  useEffect(() => {
    setProjects(projectsData);
    setWbs(wbsData);
    setTasks(tasksData);
  }, []);

  const handleToggleProject = (id: number) => {
    setExpandedProjects(prevState =>
      prevState.includes(id)
        ? prevState.filter(projectId => projectId !== id)
        : [...prevState, id]
    );
  };

  return (
    <ul>
      {projects.map(project => (
        <li key={project.id}>
          <div onClick={() => handleToggleProject(project.id)}>
            {expandedProjects.includes(project.id) ? 'v' : '>'} {project.name}
          </div>
          {expandedProjects.includes(project.id) && (
            <WBSList
              wbs={wbs.filter(w => w.projectId === project.id)}
              tasks={tasks}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;