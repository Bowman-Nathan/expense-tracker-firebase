import { Component, computed, signal } from "@angular/core";
import { ExpenseService } from "../../services/expense-service";
import { ExpenseItemComponent} from '../expense-item/expense-item';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [
    ExpenseItemComponent,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './expense-list.html'
})
export class ExpenseListComponent {
  selectedCategory = signal('All');
  startDate = signal('');
  endDate = signal('');
  minAmount = signal('');
  maxAmount = signal('');

  constructor(public expenseService: ExpenseService) {}

  filteredExpenses = computed(() => {
  return this.expenseService.expenses().filter(expense => {
    const categoryMatches =
      this.selectedCategory() === 'All' ||
      expense.category === this.selectedCategory();

    const startMatches =
      this.startDate() === '' ||
      expense.date >= this.startDate();

    const endMatches =
      this.endDate() === '' ||
      expense.date <= this.endDate();

    const minMatches =
      this.minAmount() === '' ||
      Number(expense.amount) >= Number(this.minAmount());

    const maxMatches =
      this.maxAmount() === '' ||
      Number(expense.amount) <= Number(this.maxAmount());

    return (
      categoryMatches &&
      startMatches &&
      endMatches &&
      minMatches &&
      maxMatches
    );
  });
});

  expenses = this.filteredExpenses;

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id);
  }
}