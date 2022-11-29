import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBox from "@mui/material/IconButton";

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}
const AddItemForm = React.memo((props: AddItemFormType) => {
    console.log("AddItemForm called")
    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    const addItemHandler = async() => {
        if (title.trim() !== '') {
           try{
            await props.addItem(title.trim())
            setTitle('')
        }
        catch(error){
           }
        }
        else {
            setError('Title required')
        }
    };

    const onkeyPresshandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null)
            setError(null)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }
    return (

        <div style={{position:'relative'}} >
            <TextField
                variant={'outlined'}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onkeyPresshandler}
                label={'Title'}
                helperText={error}
                disabled={props.disabled}/>

            <IconButton style={{position:'absolute', right:'5px'}}
                color='primary' onClick={addItemHandler} disabled={props.disabled}>
                <AddBox >+</AddBox>
            </IconButton>

        </div>)
});

export default AddItemForm;