import { Component } from "@angular/core";
import { ExpenseService } from "../../services/expense-service";
import { ExpenseItemComponent} from '../expense-item/expense-item';

@Component({
    selector: 'app-expense-list',
    imports:[ExpenseItemComponent],
    templateUrl: './expense-list.html'
})
export class ExpenseListComponent{
    constructor(public expenseService: ExpenseService) {}
    deleteExpense(id: string){
        this.expenseService.deleteExpense(id);
    }
}