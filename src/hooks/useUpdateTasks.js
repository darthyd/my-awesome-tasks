import { useContext } from "react";
import useFirebase from "./useFirebase"
import Context from "../context/index"

export default function updateTasks(){
    const { addTask, updateTask, deleteTask, setNewDocument } = useFirebase();
    const { setTasks, tasks } = useContext(Context);

    const addNewTask = async (uid, data) => {
        const id = await addTask(uid, data);
        if(id) {
            setTasks([...tasks, {id, ...data}]);
            setNewDocument(uid, uid, { lastUpdateAt: data.createdAt });
        }
        setTasks([ ...tasks, { ...data, id } ]);
    }

    const editTask = async (uid, id, data) => {
        try {
            updateTask(uid, id, data)
            setNewDocument(uid, uid, { lastUpdateAt: data.updatedAt });
        } catch (error) {
            console.log(error);
        }
    }

    const removeTask = (uid, id) => {
        deleteTask(uid, id);
        setTasks(tasks.filter(task => task.id !== id));
    }

    return { addNewTask, editTask, removeTask };
}