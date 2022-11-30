import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBox from "@mui/material/IconButton";

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}
export const AddItemForm = React.memo((props: AddItemFormType) => {

    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }

    const addItemHandler = async () => {
        if (title.trim() !== '') {

            try {
                await props.addItem(title)
                setTitle('')
            } catch (e: any) {

                const error = e.message
                if(error!=='Network Error')
                setError(error)
            }
        } else {
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
    const onBlurHandler = () => {
        setError(null)
    }
    return (

        <div style={{position: 'relative'}}>
            <TextField
                autoFocus
                onBlur={onBlurHandler}
                variant={'outlined'}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onkeyPresshandler}
                label={'Title'}
                helperText={error}
                disabled={props.disabled}/>

            <IconButton
                color='primary' onClick={addItemHandler} disabled={props.disabled}>
                <AddBox>+</AddBox>
            </IconButton>

        </div>)
});

