import { BrowserRouter , Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/users/login";
import Register from "./pages/users/register";
import AddExpense from "./pages/expense/AddExpense";
import AddIncome from "./pages/income/AddIncome";
import Profile from "./pages/users/profile";
import PrivateNavbar from "./components/Navigation/Navbar";
import NotAdmin from "./components/NotAdmin";
import ExpenseList from "./pages/expense/ExpenseList";




function App(){
  return(
    <BrowserRouter>
    <PrivateNavbar/>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/not-found' element={<NotAdmin/>} />
    <Route path='/expenses' element={<ExpenseList/>} />
    {/* <Route path='/dashboard' element={<DashboardData/>} /> */}
    <Route path='/add-expense' element={<AddExpense/>} />
    <Route path='/add-income' element={<AddIncome/>} />
    <Route path='/profile' element={<Profile/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    </Routes>
    </BrowserRouter>

      // <Home />
  );
}

export default App;
