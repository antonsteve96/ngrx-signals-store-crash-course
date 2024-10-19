import {Component, effect, inject, viewChild} from '@angular/core';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatTabGroup} from "@angular/material/tabs";
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {TodosFilter, TodosStore} from "../store/todos.state";
import {CommonModule, NgIf, NgStyle} from "@angular/common";

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
    await this.todosStore.addTodo(inputValue);
  }

  async onDeleteTodo(id: number, event: MouseEvent) {
    event.stopPropagation();
    await this.todosStore.deleteTodo(id);
  }

  async onTodoToggled(id: number, completed: boolean) {
    await this.todosStore.updateToDo(id, completed);

  }

  onFilterTodos(event: MatButtonToggleChange) {
    const filter = event.value as TodosFilter;
    this.todosStore.updateFilter(filter);
  }

}
