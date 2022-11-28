import * as todolistsSelectors from './selectors'
import {ActionsType as asyncTodolistsActions} from './todolist-reducer'
import {slice} from './todolist-reducer'
import {ActionType as tasksActions} from './tasks-reducer'

const todolistsActions={
    ...asyncTodolistsActions, ...slice.actions
}
export {
    todolistsSelectors,
    todolistsActions,
    tasksActions
}
