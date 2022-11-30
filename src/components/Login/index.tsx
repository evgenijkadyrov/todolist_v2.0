import * as loginSelectors from './selectors'
import {ActionsType as loginAsyncActions, slice} from './login-reducer'
import {Login}from './Login'
const loginActions={
    ...loginAsyncActions, ...slice.actions
}
const loginReducer=slice.reducer
export {
    loginSelectors,
    loginActions,loginReducer,Login
}