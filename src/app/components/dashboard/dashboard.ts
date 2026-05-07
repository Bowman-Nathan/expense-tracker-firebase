import { Component } from "@angular/core";
import { ExpenseService } from "../../services/expense-service";
import { MatCardModule } from "@angular/material/card";
import { BaseChartDirective } from 'ng2-charts'
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {

  constructor(public expenseService: ExpenseService) {}

}