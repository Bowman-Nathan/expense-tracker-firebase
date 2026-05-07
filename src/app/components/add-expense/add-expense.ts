import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ExpenseService } from "../../services/expense-service";
import { ExpenseCategory, TransactionType } from "../../models/expense";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: 'app-add-expense',
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule],
    templateUrl: './add-expense.html'
})
export class AddExpenseComponent {
    title = '';
    amount = 0;
    category: ExpenseCategory = 'Personal';
    type: TransactionType = 'Expense';
    date = new Date().toISOString().substring(0, 10);
    notes = '';


constructor(public expenseService: ExpenseService) {}

async addExpense() {
    if (this.title.trim() === '' || this.amount <= 0) {
            return;
        }

        await this.expenseService.addExpense(
            this.title,
            this.amount,
            this.category,
            this.type,
            this.date,
            this.notes
        );

        this.title = '';
        this.amount = 0;
        this.category = 'Personal';
        this.type = 'Expense';
        this.date = new Date().toISOString().substring(0,10);
        this.notes = '';
    }
}