import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ExpenseService } from '../../services/expense-service';
import { ExpenseCategory } from '../../models/expense';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './budget.html',
  styleUrl: './budget.css'
})
export class BudgetComponent {
  selectedCategory = signal<ExpenseCategory>('Food');
  budgetAmount = signal(0);

  budgets = signal<Record<string, number>>(
  JSON.parse(localStorage.getItem('budgets') || '{}')
);

  constructor(public expenseService: ExpenseService) {}

  saveBudget() {
  const updatedBudgets = {
    ...this.budgets(),
    [this.selectedCategory()]: Number(this.budgetAmount())
  };

  this.budgets.set(updatedBudgets);

  localStorage.setItem(
    'budgets',
    JSON.stringify(updatedBudgets)
  );

  this.budgetAmount.set(0);
}

  spentForCategory(category: ExpenseCategory) {
    return this.expenseService
      .expenses()
      .filter(expense =>
        expense.type === 'Expense' &&
        expense.category === category
      )
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
  }

  isOverBudget(category: ExpenseCategory) {
    const budget = this.budgets()[category] || 0;
    return budget > 0 && this.spentForCategory(category) > budget;
  }
}