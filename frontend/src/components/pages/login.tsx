import AuthForm from "../login-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* <LoginForm /> */}
        <AuthForm/>
      </div>
    </div>
  )
}

// import Login from '@react-login-page/page3';
// import defaultBannerImage from '@react-login-page/page3/bg.jpeg';

// const Page = () => (
//   <Login style={{ height: 580 }}>
//     <Login.Banner style={{ backgroundImage: `url(${defaultBannerImage})` }} />
//     <Login.Password required>
//       <div>xx</div>
//     </Login.Password>
//   </Login>
// );

// export default Page;