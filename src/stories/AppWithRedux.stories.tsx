import App from "../components/App/App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default{
    title:'AppWithRedux component',
    component:App,
    decorators:[ReduxStoreProviderDecorator,BrowserRouterDecorator]
}
export const AppWithReduxBaseExample = () => {
    return <App demo={true}/>
}