import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface IncomeState {
  transactions: Transaction[];
}

const initialState: IncomeState = {
  transactions: JSON.parse(localStorage.getItem("incomes") || "[]"),
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    addIncome:(state,action:PayloadAction<Transaction>)=>{
      state.transactions.push(action.payload);
      localStorage.setItem('incomes',JSON.stringify(state.transactions));
    },
    updateIncome:(state,action:PayloadAction<Transaction>)=>{
      const index = state.transactions.findIndex(t=>t.id === action.payload.id)
      if (index !== -1) {
        state.transactions[index] = action.payload;
        localStorage.setItem("incomes",JSON.stringify(state.transactions))
      }
    },
    deleteIncome:(state,action:PayloadAction<number>)=>{
      state.transactions = state.transactions.filter(t=>t.id !== action.payload);
      localStorage.setItem("incomes",JSON.stringify(state.transactions))
    }
  },
});

export const { addIncome, deleteIncome, updateIncome } = incomeSlice.actions;
export default incomeSlice.reducer;