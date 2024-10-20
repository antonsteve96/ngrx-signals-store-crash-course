import {Component, inject, OnInit, signal} from '@angular/core';
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
  isLoading = signal<boolean>(false);

  ngOnInit() {
    console.log("loading = ", this.todosStore.loading());
    this.isLoading.set(true);
    this.loadTodos().then(() => {
      console.log("loading = ", this.todosStore.loading());
      this.isLoading.set(false);
    })
  }

  async loadTodos() {
    await this.todosStore.loadAll();
  }

}
