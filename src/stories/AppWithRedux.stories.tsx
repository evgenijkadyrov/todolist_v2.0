import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default{
    title:'AppWithRedux component',
    component:AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
}
export const AppWithReduxBaseExample = () => {
    return <AppWithRedux/>
}