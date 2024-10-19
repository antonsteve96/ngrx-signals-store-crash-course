import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TodosStore} from "./store/todos.state";
import {CommonModule, JsonPipe} from "@angular/common";
import {TodosListComponent} from "./todos-list/todos-list.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, CommonModule, TodosListComponent, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  todosStore = inject(TodosStore)

  ngOnInit() {
    console.log("loading = ", this.todosStore.loading());
    this.loadTodos().then(() => console.log("loading = ",this.todosStore.loading()))
  }

  async loadTodos() {
    await this.todosStore.loadAll();
  }

}
