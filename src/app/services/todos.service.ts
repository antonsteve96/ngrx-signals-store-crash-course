import {Injectable} from "@angular/core";
import {TODOS} from "../mock-data";
import {Todo} from "../models/todo.models";

@Injectable({
  providedIn: "root"
})
export class TodosService{
  async getTodos() {
    await sleep(1000)
    return TODOS;
  }

  async addTodo(todo: Partial<Todo>) {
    await sleep(1000);
    return {
      id: Math.random(),
      ...todo
    } as Todo

  }

  async deleteTodo(id: number) {
    await sleep(500);
  }

  async updateTodo(id: number, completed: boolean) {
    await sleep(500);

  }

}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
