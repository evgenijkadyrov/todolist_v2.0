import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title:'AddItemForm component',
    component:AddItemForm
}
const AddItenCallback=async ()=>{
    await callback
}

const callback=action('Button add was pressed')
export const AddItemFormBAseExample = (props:any) => {
    return <AddItemForm addItem={AddItenCallback} disabled={true}/>}