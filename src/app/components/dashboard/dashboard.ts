import { Component } from "@angular/core";
import { ExpenseService } from "../../services/expense-service";

@Component({
    selector: 'app-dashboard',
    imports: [],
    templateUrl: './dashboard.html'
})
export class DashboardComponent {
    constructor(public expenseService: ExpenseService) {}
}