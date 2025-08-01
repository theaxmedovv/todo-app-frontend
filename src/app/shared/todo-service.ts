import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Auth, signInAnonymously } from '@angular/fire/auth';

export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection;

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {
    this.todosCollection = collection(this.firestore, 'todos');
    this.initAuth();
  }

  // Ilova ishga tushganda anonim foydalanuvchini tizimga kiritish
  private async initAuth(): Promise<void> {
    try {
      await signInAnonymously(this.auth);
      console.log("Anonim foydalanuvchi muvaffaqiyatli tizimga kirdi.");
    } catch (error) {
      console.error("Tizimga kirishda xato yuz berdi:", error);
    }
  }

  getTodos(): Observable<Todo[]> {
    return collectionData(this.todosCollection, { idField: 'id' }) as Observable<Todo[]>;
  }

  addTodo(todo: Todo) {
    return addDoc(this.todosCollection, todo);
  }

  // Tahrirlash uchun updateTodo funksiyasini universal qildik
  updateTodo(id: string, data: Partial<Todo>) {
    const todoDoc = doc(this.firestore, `todos/${id}`);
    return updateDoc(todoDoc, data);
  }

  deleteTodo(id: string) {
    const todoDoc = doc(this.firestore, `todos/${id}`);
    return deleteDoc(todoDoc);
  }
}
