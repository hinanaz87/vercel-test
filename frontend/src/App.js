import logo from './logo.svg';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import Seller from './pages/Seller';
import AllUsers from './pages/AllUsers';
import AddProduct from './pages/AddProduct';
import Products from './pages/Products';
import AllProducts from './pages/AllProducts';
import EditUser from './pages/EditUser';
import ApproveProducts from './pages/ApproveProducts';
import EditProduct from './pages/EditProduct';
import Splash from './pages/Splash';
import Error from './pages/Error';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';


function App() {
  return (
 
    < >
   
    <Navbar />


    <Routes>
    
    <Route path="/" element={<Splash />} />
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/adminpage" element={<AdminPage />} />
    <Route path="/buyer" element={<Home />} />
    <Route path="/seller" element={<Seller />} />
    <Route path="/users" element={<AllUsers />} />
    <Route path="/addproduct" element={<AddProduct />} />
    <Route path="/products/:id" element={<Products />} />
    <Route path="/products" element={<AllProducts />} />
    <Route path="/user/:id" element={<EditUser />} />
    <Route path="/product/:id" element={<EditProduct />} />
    <Route path="/approveproduct" element={<ApproveProducts />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />


    <Route path="/*" element={<Error />} />







    {/* <Route path="/adminpage" element={< Protected Component={AdminPage} />} /> */}
    {/* <Route path="/profile/:id" element={<Profile />} /> */}
    {/* <Route path="/user" element={<UserPage />} /> */}
    {/* <Route path="/user/:id" element={<EditProfile />} /> */}

    {/* <Route path="/addproduct" element={<AddProduct />} /> */}
    {/* <Route path="/addproduct" element={< Protected Component={AddProduct} />} /> */}
    {/* <Route path="/allproducts" element={<AllProducts />} /> */}
    {/* <Route path="/product/:id" element={<EditProduct />} /> */}


    {/* <Route path="/newproduct" element={<AddProductImage />} /> */}




        
    </Routes>
  </>

  );
}

export default App;
