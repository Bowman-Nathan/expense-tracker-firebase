import { Component, computed, signal } from "@angular/core";
import { ExpenseService } from "../../services/expense-service";
import { ExpenseItemComponent} from '../expense-item/expense-item';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [
    ExpenseItemComponent,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './expense-list.html'
})
export class ExpenseListComponent {
  selectedCategory = signal('All');

  constructor(public expenseService: ExpenseService) {}

  filteredExpenses = computed(() => {
    if (this.selectedCategory() === 'All') {
      return this.expenseService.expenses();
    }

    return this.expenseService
      .expenses()
      .filter(expense => expense.category === this.selectedCategory());
  });

  expenses = this.filteredExpenses;

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id);
  }
}