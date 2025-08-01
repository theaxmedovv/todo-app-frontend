// src/app/app.ts
import { Component, signal } from '@angular/core';
import { Todo } from './todo/todo'; // Import the Todo component

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [Todo] // ✅ This line is required for <app-todo>
})
export class AppComponent {
  protected readonly title = signal('todoApp');
}
