import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import NavLayout from './Components/NavLayout';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import ContactUs from './Components/ContactUs';
import Layout from './Admin/Layout';
import Product from './Admin/Product';
import Order from './Admin/Order';
import Cart from './Components/Cart';
import Profile from './Components/Profile';
import Failed from './Components/Failed';
// import Cloudinary from './Components/Cloudinary';
import Payment from './Admin/Payment';
import Category from './Admin/Category';
import Setting from './Admin/Setting';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/navlayout" element={<NavLayout />}> {/* Parent route */}


        </Route>


        <Route path='/cart' element={<Cart />} />

        <Route path='/profile' element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path='/layout' element={<Layout />}>
        </Route>
        <Route path='/product' element={<Product />} />
        <Route path='/order' element={<Order />} />
        <Route  path='/category' element ={<Category/>}/>
        <Route  path='/payment' element ={<Payment/>}/>
        <Route  path='/setting' element ={<Setting/>}/>


        {/* <Route path='/cloud' element = {<Cloudinary/>}/> */}
        <Route path='*' element={<Failed />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
