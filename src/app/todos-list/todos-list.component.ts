import {Component, effect, inject, viewChild} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatTabGroup} from "@angular/material/tabs";
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {TodosStore} from "../store/todos.state";
import {CommonModule, NgIf, NgStyle} from "@angular/common";
import {TodosFilter} from '../store/todo-state-model';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatTabGroup,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSelectionList,
    MatListOption,
    NgStyle,
    NgIf,
    CommonModule
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  todosStore = inject(TodosStore);

  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filter = this.filter()
      filter.value = this.todosStore.filter()
    });
  }

  async onAddTodo(inputValue: string) {
    this.todosStore.setloading(true);
    try {
      await this.todosStore.addTodo(inputValue);
    } catch (e) {
      console.error("Errore durante l'aggiunta del todo", e);
    } finally {
      this.todosStore.setloading(false);
    }
  }

  async onDeleteTodo(id: number, event: MouseEvent | KeyboardEvent) {
    event.stopPropagation();
    this.todosStore.setloading(true);
    try {
      await this.todosStore.deleteTodo(id);
    } catch (e) {
      console.error("Errore durante l'eliminazione del todo", e);
    } finally {
      this.todosStore.setloading(false);
    }
  }

  async onTodoToggled(id: number, completed: boolean) {
    this.todosStore.setloading(true);
    try {
      await this.todosStore.updateToDo(id, completed);
    } catch (e) {
      console.error("Errore durante l'aggiornamento del todo", e);
    } finally {
      this.todosStore.setloading(false);
    }
  }

  onFilterTodos(event: MatButtonToggleChange) {
    const filter = event.value as TodosFilter;
    this.todosStore.updateFilter(filter);
  }

}
