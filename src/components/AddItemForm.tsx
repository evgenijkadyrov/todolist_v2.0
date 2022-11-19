import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType={
    addItem:(title:string)=>void
}
const AddItemForm = React.memo((props:AddItemFormType) => {
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
        if(error!==null)
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }
    return (

        <div>

            <input className={error ? 'error' : ''}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onkeyPresshandler}/>
            <button onClick={addItem}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>)
});

export default AddItemForm;