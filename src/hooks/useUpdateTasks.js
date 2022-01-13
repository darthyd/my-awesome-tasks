import { useContext } from "react";
import useFirebase from "./useFirebase"
import Context from "../context/index"

export default function updateTasks(){
    const { addTask, updateTask, deleteTask } = useFirebase();
    const { setTasks, tasks } = useContext(Context);

    const addNewTask = async (uid, data) => {
        const id = await addTask(uid, data);
        setTasks([ ...tasks, { ...data, id } ]);
    }

    const editTask = async (uid, id, data) => {
        return await updateTask(uid, id, data);
    }

    const removeTask = (uid, id) => {
        deleteTask(uid, id);
        setTasks(tasks.filter(task => task.id !== id));
    }

    return { addNewTask, editTask, removeTask };
}