import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";

type InputPropsType = {
    callBack: (newTitle: string) => void
}

export const Input = (props: InputPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.charCode === 13) {
            addTask();
        }
    }

    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            <TextField
                error={error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                size={"small"}
                id="outlined-basic"
                label={error ? "Title is required" : "Type in..."}
                variant="outlined" />
            {/*<button onClick={addTask}>+</button>*/}
            <Button
                onClick={addTask}
                variant="contained"
                style={{maxWidth: '40px', maxHeight: '40px', minWidth: '30px', minHeight: '30px'}}>+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};