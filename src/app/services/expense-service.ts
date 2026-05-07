import { computed, Injectable, signal } from '@angular/core';

import { initializeApp, getApp, getApps } from 'firebase/app';

import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from 'firebase/firestore';

import { environment } from '../../environments/environment';
import { Expense, ExpenseCategory, TransactionType } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private firebaseApp = getApps().length
    ? getApp()
    : initializeApp(environment.firebase);

  private firestore = getFirestore(this.firebaseApp);
  private expensesCollection = collection(this.firestore, 'expenses');

  expenses = signal<Expense[]>([]);

  categories = signal<ExpenseCategory[]>([
    'Work',
    'Personal',
    'Grocery',
    'Utilities',
    'Shopping',
    'Travel',
    'Food'
  ]);

  constructor() {
    onSnapshot(this.expensesCollection, snapshot => {
      const expenses = snapshot.docs.map(document => ({
        id: document.id,
        ...document.data()
      })) as Expense[];

      this.expenses.set(expenses);
    });
  }

  totalExpense = computed(() =>
    this.expenses().reduce((sum, expense) => sum + Number(expense.amount), 0)
  );

  highestExpense = computed(() => {
    if (this.expenses().length === 0) {
      return 0;
    }

    return Math.max(...this.expenses().map(expense => Number(expense.amount)));
  });

  averageExpense = computed(() => {
    if (this.expenses().length === 0) {
      return 0;
    }

    return this.totalExpense() / this.expenses().length;
  });

  transactionCount = computed(() => this.expenses().length);

    async addExpense(
      title: string,
      amount: number,
      category: ExpenseCategory,
      type: TransactionType,
      date: string,
      notes: string
    ) {
      await addDoc(this.expensesCollection, {
        title,
        amount: Number(amount),
        category,
        type,
        date,
        notes
      });
    }

  async deleteExpense(id: string) {
    await deleteDoc(doc(this.firestore, `expenses/${id}`));
  }

  getExpenseById(id: string) {
    return this.expenses().find(expense => expense.id === id);
  }

  async editExpense(updatedExpense: Expense) {
    await updateDoc(doc(this.firestore, `expenses/${updatedExpense.id}`), {
      title: updatedExpense.title,
      amount: Number(updatedExpense.amount),
      category: updatedExpense.category
    });
  }
}