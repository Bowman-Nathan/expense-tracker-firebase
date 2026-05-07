import { Component } from "@angular/core";
import { ExpenseService } from "../../services/expense-service";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: 'app-dashboard',
    imports: [MatCardModule],
    templateUrl: './dashboard.html'
})
export class DashboardComponent {
    constructor(public expenseService: ExpenseService) {}
}