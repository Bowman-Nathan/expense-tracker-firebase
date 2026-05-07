import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ExpenseService } from "../../services/expense-service";
import { ExpenseCategory } from "../../models/expense";

@Component({
    selector: 'app-edit-expense',
    imports: [FormsModule],
    templateUrl: './edit-expense.html'
})

export class EditExpenseComponent {
    id = '';
    title = '';
    amount= 0;
    category: ExpenseCategory='Personal';

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
        }
    }

    saveExpense() {
        if (this.title.trim() === '' || this.amount <= 0){
            return;
        }

        this.expenseService.editExpense({
            id: this.id,
            title: this.title,
            amount: this.amount,
            category: this.category
        });

        this.router.navigate(['/expenses']);4
    }
}