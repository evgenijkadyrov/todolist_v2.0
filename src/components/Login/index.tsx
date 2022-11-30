import * as loginSelectors from './selectors'
import {ActionsType as loginActions, slice} from './login-reducer'
const loginReducer=slice.reducer
export {
    loginSelectors,
    loginActions,loginReducer
}