import { useSelector } from "react-redux";
import { RootState } from "../store";

export const Home = () => {
    const transactions = useSelector((state: RootState) => state.transactions.transactions);
    const totalExpenses = transactions.reduce((total, item) => total + Number(item.amount), 0);

    const incomes = useSelector((state:RootState)=>state.incomes.transactions);
    const totalIncomes = incomes.reduce((total,item)=> total + Number(item.amount),0);


    return (
        <>
            <div className="md:ml-72 text-gray-300 p-2">
                <div className="flex flex-col gap-3">
                    <h1 className="mt-5 text-3xl text-white">DashBoard</h1>
                    <h2>Welcome back,Ms. abc xyz</h2>
                    <h4 className="mb-3">Here's summery of your overoll financial status</h4>
                </div>
                <div className="flex flex-col gap-10">
                    <div className="h-[10rem] w-[95%] bg-blue-900 p-5 rounded flex flex-col gap-5">
                        <p className="text-3xl">Total</p>
                        <p className="text-5xl">₹{totalExpenses + totalIncomes}</p>
                    </div>
                    <div className="flex m-1 gap-5">
                        <div className="w-[50%] bg-blue-900 rounded h-[25vh] p-8 flex flex-col gap-5">
                            <h1 className="text-3xl">Incomes</h1>
                            <p className="text-5xl">₹{totalIncomes}</p>
                        </div>
                        <div className="w-[45%] bg-blue-900 rounded h-[25vh] p-8 flex flex-col gap-5">
                            <h1 className="text-3xl">Expenses</h1>
                            <p className="text-5xl">₹{totalExpenses}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
