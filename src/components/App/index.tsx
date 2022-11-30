import * as appSelectors from './selectors'
import {ActionsType as appAsyncActions} from './app-reducer'
import {slice}from './app-reducer'

const appActions={
    ...appAsyncActions, ...slice.actions
}
const appReducer=slice.reducer
export {
    appSelectors,appActions,appReducer
}