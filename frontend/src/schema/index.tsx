import * as Yup from "yup";

export const signUpSchema = Yup.object({
    description : Yup.string()
        .min(4,"Descreption must be atleast 4 characters")
        .required("Description is required"),
    amount :  Yup.number().
        min(1,"Amount must be greather than 0").
        required("Amount is required") ,
    date :  Yup.string().required("Date is required"),
    category :  Yup.string()
        .oneOf(['fixed_expenses','periodic_Expenses','salary_wages','marketing_advertisement','other','rent','freelance','investment','salary'],'Please select valid category')
        .required("Category is required"),
})

