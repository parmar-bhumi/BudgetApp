import { useEffect, useState } from 'react';
import { Chart } from './ChartConfig';
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addIncome, deleteIncome, updateIncome } from '../features/IncomeSlice';
import { signUpSchema } from '@/schema';
import { useFormik } from 'formik';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date : string;
  category:string;
}

const initialValues = {
  description:"",
  amount:"",
  date:"",
  category : ""
}

export const Incomes = () => {

  const transactions = useSelector((state:RootState)=>state.incomes.transactions);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState<number | null>(null);
  const [searchQuery,setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(transactions));
  }, [transactions]);

  const formik = useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit : (values,actions)=>{
        const transaction = {
          id: edit || Date.now(),
          description : values.description,
          amount : Number(values.amount),
          date : values.date,
          category : values.category,
        };
  
        if (edit !== null) {
          dispatch(updateIncome(transaction));
          setEdit(null)
        }else{
          dispatch(addIncome(transaction));
        }
  
        actions.resetForm();
  
      }
    })

  const exportToexcel = () => { 
    const ws = XLSX.utils.json_to_sheet(transactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Incomes");
    XLSX.writeFile(wb,"Incomes.xlsx");
   }
  
  const handleEdit = (t: Transaction) => {
    formik.setValues({
      description: t.description,
      amount : t.amount.toString(),
      date : t.date,
      category : t.category,
    });
      setEdit(t.id);
  };

  const handleDelete = (id: number) => {
    const isConfirmed = window.confirm("Are you sure to want to delete this Expenses ?");
    if (isConfirmed) {
      dispatch(deleteIncome(id))
    }
  };

  const filteredExp = searchQuery.length > 0 ? transactions.filter((expense: { description: string; category: string; }) =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category?.toLowerCase().includes(searchQuery.toLowerCase())
) : transactions;

const totalIncomes = transactions.reduce((total,income)=> total + (income.amount),0)

const incomeDataByCategory = transactions.reduce((acc: { [x: string]: any; }, curr: { category: any; amount: any; }) => {
  const key = curr.category;
  acc[key] = (acc[key] || 0) + Number(curr.amount);
  return acc;
}, {} as Record<string, number>);

const chartData = Object.entries(incomeDataByCategory).map(([name, value]) => ({ name, value }));

  return (
     <div className='max-w-4xl mx-auto p-4 md:ml-90'>
          <h1 className='tracking-wide text-3xl text-gray-300 mb-6'>Incomes</h1>
          <h3 className='mb-2 text-gray-500'>Hey,mr abc your incomes is here...</h3>
          <div>
            <input type="search" placeholder='Search your imcomes...' onChange={(e)=>setSearchQuery(e.target.value)} className='border-1 w-full p-2 rounded-3xl mb-10 outline-0 border-gray-400 text-white' />
          </div>
          <div className='flex gap-5 justify-between'>
            <div className='bg-blue-500 md:h-24 h-30 w-1/2 rounded p-4 flex flex-col gap-4'>
              <h1 className='text-2xl text-blue-950 font-bold'>Total Incomes</h1>
              <p>Total : ₹{totalIncomes.toFixed(2)}</p>
            </div>
            <div className='md:w-[25vw] w-[45vw] border-2 border-gray-500 p-3 mb-[10%]'>{<Chart data={chartData}/>}</div>
          </div>
    
          <form className='space-y-6' onSubmit={formik.handleSubmit}>
    
            <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
              <div className='w-full'>
                <label className="block mb-1 font-medium text-gray-400">Name :</label>
                <input type="text" placeholder='Enter name' name='description' value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full border p-2 rounded text-gray-300 ${formik.errors.description ? 'border-red-500' : '' }`} />
                 {formik.errors.description && formik.touched.description ? (<p className='text-red-500'>{formik.errors.description}</p>) : null}
              </div>
              <div className='w-full'>
                <label className='block mb-1 font-medium text-gray-400'>Amount : </label>
                 <input type="number" placeholder='Enter amount' name="amount" value={formik.values.amount} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full border p-2 rounded text-gray-300 ${formik.errors.amount ? 'border-red-500' : '' }`}  />
             {formik.errors.amount && formik.touched.amount ? (<p className='text-red-500'>{formik.errors.amount}</p>) : null}
              </div>
            </div>
    
            <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
              <div className='w-full'>
                <label className='block mb-1 font-medium text-gray-400'>Date :</label>
                <input type="date" name='date'  value={formik.values.date} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`w-full border p-2 rounded text-gray-300 ${formik.errors.date ? 'border-red-500' : '' }`}  />
            {formik.errors.date && formik.touched.date ? (<p className='text-red-500'>{formik.errors.date}</p>) : null}
              </div>
              <div className='w-full'>
                <label className='block mb-1 font-medium text-gray-400'>Category : </label>
                <select value={formik.values.category} onChange={formik.handleChange} onBlur={formik.handleBlur} name='category' className={`w-full border p-2 rounded text-gray-200 ${formik.errors.category ? 'border-red-500' : '' }`}>
                  <option value="select">Select a Category</option>
                  <option value="rent">Rent</option>
                  <option value="freelance">Freelance</option>
                  <option value="investment">Investment</option>
                  <option value="salary">salary</option>
                  <option value="other">Other</option>
                </select>
                {formik.errors.category && formik.touched.category && <p className='text-red-500'>{formik.errors.category}</p>}
              </div>
            </div>
    
            <div>
              <button className='bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded-xl transition duration-300 m-5 ml-40'>{edit !== null ? 'Edit Income' : 'Add Income'}</button>
            </div>
            
          </form>
    
          <div>
            <table className='w-full text-sm border-gray-100 border-collapse'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='p-2 border'>Amount</th>
                  <th className='p-2 border'>Description</th>
                  <th className='p-2 border'>Date</th>
                  <th className='p-2 border'>Category</th>
                  <th className='p-2 border'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExp.map((t: Transaction) => (
                  <tr key={t.id} className='text-center border-t text-gray-400'>
                    <td className='p-2 border'>₹{t.amount}</td>
                    <td className='p-2 border'>{t.description}</td>
                    <td className='p-2 border'>{t.date}</td>
                    <td className='p-2 border'>{t.category}</td>
                    <td className='p-2 border space-x-2'>
                      <button onClick={() => handleEdit(t)} className='bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded'>Edit</button>
                      <button onClick={() => handleDelete(t.id)} className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button onClick={exportToexcel} className='text-gray-300 border-2 px-5 py-3 rounded-2xl mt-5 cursor-pointer'>
                Export to Excel
          </button>
    
        </div>
  );
};