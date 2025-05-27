import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: number;
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
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
      localStorage.setItem("expenses", JSON.stringify(action.payload));
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      localStorage.setItem("expenses", JSON.stringify(state.transactions));
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      localStorage.setItem("expenses", JSON.stringify(state.transactions));
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        localStorage.setItem("expenses", JSON.stringify(state.transactions));
      }
    }
  },
});

export const { setTransactions, addTransaction, deleteTransaction, updateTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;