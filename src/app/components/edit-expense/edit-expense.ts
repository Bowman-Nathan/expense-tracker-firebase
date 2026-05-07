import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ExpenseService } from "../../services/expense-service";
import { ExpenseCategory, TransactionType } from "../../models/expense";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-edit-expense',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule],
    templateUrl: './edit-expense.html'
})

export class EditExpenseComponent {
    id = '';
    title = '';
    amount= 0;
    category: ExpenseCategory='Personal';
    type: TransactionType = 'Expense';
    date = '';
    notes = '';

    constructor(
        public expenseService: ExpenseService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.id = this.route.snapshot.paramMap.get('id') || '';

        const expense = this.expenseService.getExpenseById(this.id);

        if(expense) {
            this.title = expense.title;
            this.amount = expense.amount;
            this.category = expense.category;
            this.type = expense.type;
            this.date = expense.date;
            this.notes = expense.notes;
        }
    }

    async saveExpense() {
        if (this.title.trim() === '' || this.amount <= 0){
            return;
        }

        await this.expenseService.editExpense({
            id: this.id,
            title: this.title,
            amount: this.amount,
            category: this.category,
            type: this.type,
            date: this.date,
            notes: this.notes
        });

        this.router.navigate(['/expenses']);
    }
}