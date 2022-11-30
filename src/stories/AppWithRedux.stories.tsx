import App from "../app/App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default{
    title:'AppWithRedux component',
    component:App,
    decorators:[ReduxStoreProviderDecorator,BrowserRouterDecorator]
}
export const AppWithReduxBaseExample = () => {
    return <App demo={true}/>
}