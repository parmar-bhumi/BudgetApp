import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "./features/ReduxSlice";
import incomeSlice from "./features/IncomeSlice"

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    incomes : incomeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;