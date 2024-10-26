import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TodosStore} from "./store/todos.state";
import {CommonModule, JsonPipe, NgOptimizedImage} from "@angular/common";
import {TodosListComponent} from "./todos-list/todos-list.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, CommonModule, TodosListComponent, MatProgressSpinnerModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  todosStore = inject(TodosStore)

  public loading = this.todosStore.loading;

  async ngOnInit() {
    try {
      await this.loadTodos();
    } catch (e) {
      console.error("Failed to load todos", e);
    }
  }

  async loadTodos() {
    await this.todosStore.loadAll();
  }

}
