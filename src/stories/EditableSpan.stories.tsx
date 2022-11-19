import EditableSpan from "../components/EditableSpan";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
//***old version****
// export default{
//     title:'EditableSpan component',
//     component: EditableSpan
// }
//  const callback = action('title change')
// export const EditableSpanBaseExample = () =>{
//     return <EditableSpan title={'new'} onChange={callback}/>
// }

//***new version***

export default {
    title:'EditableSpan component',
    component:EditableSpan,
    argTypes:{ onClick:{
        description:'Button inside form clicked'
        }},
} as ComponentMeta<typeof EditableSpan>

const Template:ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanExample = Template.bind({})
EditableSpanExample.args={
    title:'vbv',
    onChange:action('EditableSpan value changged')
}