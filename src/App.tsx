import { PlusCircle } from "phosphor-react";
import styles from "./App.module.css";

import { Header } from "./components/Header";
import { Task, TaskType } from "./components/Task";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Empty } from "./components/Empty";

export function App() {
  const [todoList, setTodoList] = useState<TaskType[]>([]);
  const [textNewTask, setTextNewTask] = useState("");

  const numberTasksFinished = todoList.reduce((prevValue, currentTask) => {
    if (currentTask.isDone) return prevValue + 1;
    return prevValue;
  }, 0);

  function updateTask(id: number, value: boolean) {
    const updatedTodoList = todoList.map((task) => {
      if (task.id === id) return { ...task, isDone: value };
      return { ...task };
    });
    setTodoList(updatedTodoList);
  }

  function onDeleteTask(id: number) {
    const todoListWithoutTaskDeleted = todoList.filter((task) => {
      return task.id !== id;
    });
    setTodoList(todoListWithoutTaskDeleted);
  }

  function handleValidityNewTask(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este campo é obrigatório");
  }

  function handleChangeContentNewTask(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setTextNewTask(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    const newTask: TaskType = {
      id: todoList.length + 1,
      content: textNewTask,
      isDone: false,
    };
    setTodoList([...todoList, newTask]);
    setTextNewTask("");
  }

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.boxNewTask}>
          <input
            value={textNewTask}
            onChange={handleChangeContentNewTask}
            onInvalid={handleValidityNewTask}
            placeholder="Adicione uma nova tarefa"
            required
          ></input>
          <button>
            Criar <PlusCircle size={16} weight="bold" />
          </button>
        </form>
        <main>
          <div className={styles.countsTasks}>
            <div className={styles.createdTasks}>
              <p>Tarefas Criadas</p>
              <span>{todoList.length}</span>
            </div>
            <div className={styles.finishedTasks}>
              <p>Concluidas</p>
              <span>{`${numberTasksFinished} de ${todoList.length}`}</span>
            </div>
          </div>
          {todoList.length !== 0 ? (
            <div className={styles.taskList}>
              {todoList.map((todo) => {
                return (
                  <Task
                    task={todo}
                    updateTask={updateTask}
                    onDeleteTask={onDeleteTask}
                  />
                );
              })}
            </div>
          ) : <Empty/>}
        </main>
      </div>
    </>
  );
}
