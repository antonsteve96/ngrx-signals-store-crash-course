import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {Todo} from "../models/todo.models";
import {computed, inject} from "@angular/core";
import {TodosService} from "../services/todos.service";
import {TodosFilter, TodosState} from "./todo-state-model";

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: "all"
}

export const TodosStore = signalStore(
  {providedIn: "root"},
  withState(initialState),
  withComputed((state) => ({
    filteredTodos: computed(() => {
      const todos = state.todos();
      switch (state.filter()) {
        case "all":
          return todos;
        case "pending":
          return todos.filter((todo: Todo) => !todo.completed);
        case "completed":
          return todos.filter((todo: Todo) => todo.completed);
        default:
          return todos; // Fallback nel caso in cui il filtro non corrisponda a nessun caso
      }
    }),
  })),
  withMethods(
    (store, todosService = inject(TodosService)) => ({
      async loadAll() {
        console.debug("loadAll() chiamato");  // Log per il debug
        patchState(store, {loading: true});
        try {
          const todos = await todosService.getTodos();
          patchState(store, {todos});
        } catch (e) {
          console.error("Errore durante il caricamento dei todos", e);
        } finally {
          patchState(store, {loading: false});
        }
      },
      async addTodo(title: string) {
        patchState(store, {loading: true});
        try {
          const todo = await todosService.addTodo({title, completed: false});
          patchState(store, (state) => ({
            todos: [...state.todos, todo]
          }))
        } catch (e) {
          console.error("Errore durante l'aggiunta del todo", e);
        } finally {
          patchState(store, {loading: false});
        }
      },
      async deleteTodo(id: number) {
        patchState(store, {loading: true});
        try {
          await todosService.deleteTodo(id);
          patchState(store, (state) => ({
            todos: [...state.todos.filter((todo: Todo) => todo.id !== id)]
          }))
        } catch (e) {
          console.error("Errore durante l'eliminazione del todo", e);
        } finally {
          patchState(store, {loading: false});
        }
      },
      async updateToDo(id: number, completed: boolean) {
        patchState(store, {loading: true});
        try {
          await todosService.updateTodo(id, completed);
          patchState(store, (state) => ({
            todos: [...state.todos.map(todo => todo.id === id ? {...todo, completed} : todo)]
          }))
        } catch (e) {
          console.error("Errore durante l'aggiornamento del todo", e);
        } finally {
          patchState(store, {loading: false});
        }
      },
      updateFilter(filter: TodosFilter) {
        patchState(store, {filter})
      },
      getLoading() {
        return store.loading();
      },
      setloading(loading: boolean) {
        patchState(store, {loading})
      }
    })
  ),)
