import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filterValue: FilterValuesType) => void
    changeTask: (todolistId: string, taskId: string, currentTitle: string) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    editTodolist: (todolistId: string, currentTitle: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter( props.id,"all");
    const onActiveClickHandler = () => props.changeFilter(props.id,"active");
    const onCompletedClickHandler = () => props.changeFilter(props.id,"completed");
    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.id, newTitle)
    }
    const editTodolistHandler = (currentTitle: string) => {
        props.editTodolist(props.id, currentTitle)
    }
    const changeTaskHandler = (currentTitle: string, tId: string) => {
        props.changeTask(props.id, tId, currentTitle )
    }

    return <div>
        <h3>
            {/*{props.title}*/}
        <EditableSpan title={props.title} callBack={editTodolistHandler}/>
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <Input callBack={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.id, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(props.id, t.id, newIsDoneValue);
                    }
                    // const changeTaskHandler = (currentTitle: string) => {
                    //     props.changeTask(props.id, t.id, currentTitle )
                    // }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                        <Checkbox defaultChecked onChange={onChangeHandler} checked={t.isDone} />
                        <EditableSpan title={t.title} callBack={(newTitle)=>changeTaskHandler(newTitle , t.id)}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button onClick={onAllClickHandler} variant={props.filter === 'all' ? "outlined" : "contained"} color="success">All</Button>
            <Button onClick={onActiveClickHandler} variant={props.filter === 'active' ? "outlined" : "contained"} color="error">Active</Button>
            <Button onClick={onCompletedClickHandler} variant={props.filter === 'completed' ? "outlined" : "contained"} color="secondary">Completed</Button>


            {/*<button className={props.filter === 'all' ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>*/}
        </div>
    </div>
}


