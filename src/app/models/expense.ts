export type ExpenseCategory =
  | 'Work'
  | 'Personal'
  | 'Grocery'
  | 'Utilities'
  | 'Shopping'
  | 'Travel'
  | 'Food';

export type TransactionType =
  | 'Income'
  | 'Expense';

export interface Expense {
  id: string;

  title: string;

  amount: number;

  category: ExpenseCategory;

  type: TransactionType;

  date: string;

  notes: string;
}