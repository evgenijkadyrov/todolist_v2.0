import {RootStateType} from "../../../utilites/types";

export const selectTodolists = (state:RootStateType) => state.todolists;
export const selectTasks = (state:RootStateType) => state.tasks;