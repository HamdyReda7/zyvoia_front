import App from './App';
import { createRoot } from "react-dom/client";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import { AllData } from './Data/AllData';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Pages/auth/Register';
import ForgotPassword from './Pages/auth/ForgotPassword';
import VerifyCode from './Pages/auth/VerifyCode';
import ResetPassword from './Pages/auth/ResetPassword';
import Home from './Pages/home/Home';

import "./i18n";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword/>,
  },
  {
    path: "/verifyCode",
    element: <VerifyCode/>,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  // {
  //   path: "/profile",
  //   element: <Profile/>,
  // },
]);

createRoot(document.getElementById("root")).render(
  <AllData>

  <RouterProvider router={router} />
  </AllData>
);


