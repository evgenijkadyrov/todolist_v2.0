import * as appSelectors from './selectors'
import {ActionsType as appAsyncActions} from './application-reducer'
import {slice as appSlice}from './application-reducer'

const appActions={
    ...appAsyncActions, ...appSlice.actions
}

const appReducer=appSlice.reducer
export {
    appSelectors,appActions,appReducer,
}