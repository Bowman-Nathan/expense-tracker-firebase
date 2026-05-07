import { computed, Injectable, signal } from '@angular/core';
import { Expense, ExpenseCategory } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  expenses = signal<Expense[]>([
    {
      id: '1',
      title: 'Laptop',
      amount: 1999.99,
      category: 'Work'
    },
    {
      id: '2',
      title: 'Groceries',
      amount: 210.67,
      category: 'Grocery'
    }
  ]);

  categories = signal<ExpenseCategory[]>([
    'Work',
    'Personal',
    'Grocery',
    'Utilities',
    'Shopping',
    'Travel',
    'Food'
  ]);

  totalExpense = computed(() =>
    this.expenses().reduce((sum, expense) => sum + expense.amount, 0)
  );

  highestExpense = computed(() => {
    if (this.expenses().length === 0) {
      return 0;
    }

    return Math.max(...this.expenses().map(expense => expense.amount));
  });

  averageExpense = computed(() => {
    if (this.expenses().length === 0) {
      return 0;
    }

    return this.totalExpense() / this.expenses().length;
  });

  transactionCount = computed(() => this.expenses().length);

  addExpense(title: string, amount: number, category: ExpenseCategory) {
    const newExpense: Expense = {
      id: Date.now().toString(),
      title,
      amount,
      category
    };

    this.expenses.update(currentExpenses => [...currentExpenses, newExpense]);
  }

  deleteExpense(id: string) {
    this.expenses.update(currentExpenses =>
      currentExpenses.filter(expense => expense.id !== id)
    );
  }

  getExpenseById(id: string) {
    return this.expenses().find(expense => expense.id === id);
  }

  editExpense(updatedExpense: Expense) {
    this.expenses.update(currentExpenses =>
      currentExpenses.map(expense =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  }
}