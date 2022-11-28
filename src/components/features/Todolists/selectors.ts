import {RootStateType} from "../../../state/store";

export const selectTodolists = (state:RootStateType) => state.todolists;
export const selectTasks = (state:RootStateType) => state.tasks;