import { Check, Trash } from "phosphor-react";
import styles from "./Task.module.css";

export interface TaskType {
  id: number;
  content: string;
  isDone: boolean;
}

interface TaskProps {
  task: TaskType;
  updateTask: (id: number, value: boolean) => void;
  onDeleteTask: (id: number) => void;
}

export function Task({ task, updateTask, onDeleteTask }: TaskProps) {
  function handleCheckTask() {
    updateTask(task.id, !task.isDone);
  }

  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  return (
    <div className={styles.task}>
      <a onClick={handleCheckTask}>
        <span
          className={`${styles.checkbox} ${
            task.isDone ? styles.checked : styles.unchecked
          }`}
        >
          {task.isDone && <Check size={12} />}
        </span>
        <p
          className={`${styles.taskContent} ${
            task.isDone ? styles.taskChecked : ""
          }`}
        >
          {task.content}
        </p>
      </a>
      <button onClick={handleDeleteTask}>
        <Trash size={18} />
      </button>
    </div>
  );
}
