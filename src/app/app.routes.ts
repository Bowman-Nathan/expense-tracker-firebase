import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { AddExpenseComponent } from './components/add-expense/add-expense';
import { ExpenseListComponent } from './components/expense-list/expense-list';
import { EditExpenseComponent } from './components/edit-expense/edit-expense';
import { BudgetComponent } from './components/budget/budget';
import { AuthComponent } from './components/auth/auth';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add', component: AddExpenseComponent},
  { path: 'expenses', component: ExpenseListComponent},
  { path: 'edit/:id', component: EditExpenseComponent},
  { path: 'budget', component: BudgetComponent},
  { path: 'auth', component: AuthComponent}
];