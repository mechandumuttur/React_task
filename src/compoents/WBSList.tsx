import React, { useState } from 'react';
import TaskList from './TaskList';

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

interface WBSListProps {
  wbs: WBS[];
  tasks: Task[];
}

const WBSList: React.FC<WBSListProps> = ({ wbs, tasks }) => {
  const [expandedWBS, setExpandedWBS] = useState<number[]>([]);

  const handleToggleWBS = (id: number) => {
    setExpandedWBS(prevState =>
      prevState.includes(id)
        ? prevState.filter(wbsId => wbsId !== id)
        : [...prevState, id]
    );
  };

  return (
    <ul>
      {wbs.map(w => (
        <li key={w.id}>
          <div onClick={() => handleToggleWBS(w.id)}>
            {expandedWBS.includes(w.id) ? 'v' : '>'} {w.name}
          </div>
          {expandedWBS.includes(w.id) && (
            <TaskList tasks={tasks.filter(task => task.wbsId === w.id)} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default WBSList;