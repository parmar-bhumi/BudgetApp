import {  Outlet } from "react-router-dom"

export const RouterNav = () => {
  return (
    <>
      <nav>
        <div className="md:ml-80 mt-[-70px] font-bold text-2xl text-white text-center">
          Budget Tracking app / Welcome
        </div>
        <hr className="md:w-[75%] md:ml-[19rem] mt-2.5" />
      </nav>
      <Outlet />
    </>
  )
}
