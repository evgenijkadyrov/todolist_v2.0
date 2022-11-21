import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBox from "@mui/material/IconButton";

type AddItemFormType = {
    addItem: (title: string) => void
}
const AddItemForm = React.memo((props: AddItemFormType) => {
    console.log("AddItemForm called")
    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    function addItem() {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title required')
        }
    }

    const onkeyPresshandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null)
            setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }
    return (

        <div>
            <TextField
                variant={'outlined'}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onkeyPresshandler}
                label={'Title'}
                helperText={error}/>

            <IconButton
                color='primary' onClick={addItem}>
                <AddBox/>
            </IconButton>

        </div>)
});

export default AddItemForm;