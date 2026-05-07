import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Expense } from "../../models/expense";
import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-expense-item',
    imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule],
    templateUrl:'./expense-item.html'
})
export class ExpenseItemComponent{
    @Input() expense!: Expense;
    @Output() delete = new EventEmitter<string>();

    deleteExpense() {
        this.delete.emit(this.expense.id);
    }
}