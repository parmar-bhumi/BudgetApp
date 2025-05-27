import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

interface FormValue {
  name?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/home";

  const formik = useFormik<FormValue>({
    initialValues: {
      name: "", email: "", password: "", confirmPassword: ""
    },
    validationSchema: Yup.object({
      name: isRegister
        ? Yup.string().required("Name is required")
        : Yup.string().notRequired(),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: isRegister
        ? Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('Password is required')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
            'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
          )
        : Yup.string().required('Password is required'),

      confirmPassword: isRegister
        ? Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Confirm Password is required')
        : Yup.string().notRequired(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        resetForm();
        const url = isRegister ? "http://localhost:5000/register" : "http://localhost:5000/login";

        const payload = isRegister
          ? {
            name: values.name,
            email: values.email,
            password: values.password,
            confirmPassword: values.password,
          }
          : {
            email: values.email,
            password: values.password,
          };

        const response = await axios.post(url, payload);
        console.log("Success:", response.data);
        alert(`${isRegister ? "Registered" : "Logged in"} successfully!`);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem("userName", response.data.user.name);

        navigate(redirectTo, { replace: true });

      } catch (error: any) {
        console.error("Login/Register error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Something went wrong");
      }
    }
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isRegister ? "Register" : "Login"}
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {isRegister &&
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" type="name" className={`w-full border p-2 rounded ${formik.errors.name ? 'border-red-500' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>)}
          </div>
        }

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input name="email" type="email" className={`w-full border p-2 rounded ${formik.errors.email ? 'border-red-500' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>)}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input name="password" type="password" className={`w-full border p-2 rounded ${formik.errors.email ? 'border-red-500' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>)}
        </div>

        {isRegister &&
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input name="confirmPassword" type="password" className={`w-full border p-2 rounded ${formik.errors.confirmPassword ? 'border-red-500' : ''}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>)}
          </div>}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">{isRegister ? "Register" : "Login"}</button>
      </form>

      <div className="mt-4 text-center text-sm">
        {isRegister ? (
          <>Already have an account?{" "}
            <button type="button" className="text-blue-600 hover:underline" onClick={() => setIsRegister(false)}>Login</button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button type="button" className="text-blue-600 hover:underline" onClick={() => setIsRegister(true)}>Register</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
// asd123@#DDD

// asdSD@#$s123fg