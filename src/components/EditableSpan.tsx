import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import TextField from "@mui/material/TextField";
type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void

}
const EditableSpan = React.memo((props: EditableSpanType) => {
    console.log('editableSpan called')
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    function activateEditMode() {
        setEditMode(true)
        setTitle(props.title)
    }

    function activateViewMode() {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    },[])
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            activateViewMode()
        }
    }

    return (editMode ?
            <TextField variant={'standard'} onChange={onChangeHandler} onBlur={activateViewMode} value={title} autoFocus
                   onKeyPress={onKeyPressHandler}/> :

            <span onDoubleClick={activateEditMode}>{props.title}</span>

    );
});

export default EditableSpan;