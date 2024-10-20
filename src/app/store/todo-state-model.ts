import {Todo} from "../models/todo.models";

export type TodosFilter = "all" | "pending" | "completed";

export type TodosState = {
  todos: Todo[],
  loading: boolean,
  filter: TodosFilter
}
