import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  _id: any;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface TransactionsState {
  transactions: Transaction[];
}

const initialState: TransactionsState = {
  transactions: JSON.parse(localStorage.getItem("expenses") || "[]"),
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    showTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      localStorage.setItem("expenses", JSON.stringify(action.payload));
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      localStorage.setItem("expenses", JSON.stringify(state.transactions));
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(t => t._id !== action.payload);
      localStorage.setItem("expenses", JSON.stringify(state.transactions));
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t._id === action.payload._id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        localStorage.setItem("expenses", JSON.stringify(state.transactions));
      }
    }
  },
});

export const { showTransactions, addTransaction, deleteTransaction, updateTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;