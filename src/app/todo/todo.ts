// src/app/todo/todo.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../shared/todo-service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  editingTodoId: string | null = null;
  editedTodoTitle: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = {
        title: this.newTodoTitle,
        completed: false
      };
      this.todoService.addTodo(newTodo);
      this.newTodoTitle = '';
    }
  }

  toggleCompleted(todo: Todo): void {
    if (todo.id) {
      this.todoService.updateTodo(todo.id, { completed: !todo.completed });
    }
  }

  // Todoni o'chirish
  deleteTodo(id: string | undefined): void {
    if (id) {
      this.todoService.deleteTodo(id);
    }
  }

  // Tahrirlash rejimini boshlash
  startEditing(todo: Todo): void {
    this.editingTodoId = todo.id || null;
    this.editedTodoTitle = todo.title;
  }

  // Tahrirlangan todoni saqlash
  saveEdit(todo: Todo): void {
    if (todo.id && this.editedTodoTitle.trim()) {
      this.todoService.updateTodo(todo.id, { title: this.editedTodoTitle.trim() });
    }
    // Tahrirlash rejimini yakunlash
    this.cancelEditing();
  }

  // Tahrirlashni bekor qilish
  cancelEditing(): void {
    this.editingTodoId = null;
    this.editedTodoTitle = '';
  }
}

export { TodoComponent as Todo };
