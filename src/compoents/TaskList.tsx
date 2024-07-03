import React from 'react';

interface Task {
  id: number;
  name: string;
  projectId: number;
  wbsId: number;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>{task.name}</li>
      ))}
    </ul>
  );
};

export default TaskList;