import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ExpenseService } from "../../services/expense-service";
import { ExpenseCategory } from "../../models/expense";
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


constructor(public expenseService: ExpenseService) {}

addExpense() {
    if (this.title.trim() === '' || this.amount <= 0) {
            return;
        }

        this.expenseService.addExpense(this.title, this.amount, this.category);

        this.title = '';
        this.amount = 0;
        this.category = 'Personal';
    }
}