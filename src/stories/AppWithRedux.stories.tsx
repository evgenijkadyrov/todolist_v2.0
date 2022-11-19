import App from "../components/App/App";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default{
    title:'AppWithRedux component',
    component:App,
    decorators:[ReduxStoreProviderDecorator]
}
export const AppWithReduxBaseExample = () => {
    return <App/>
}