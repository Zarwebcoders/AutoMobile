import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';

// Placeholder pages for now
import Inquiries from './pages/Inquiries';
const Categories = () => <div className="text-3xl font-black italic font-oswald uppercase">Category Management</div>;
const Blogs = () => <div className="text-3xl font-black italic font-oswald uppercase">Blog Management</div>;
const FAQs = () => <div className="text-3xl font-black italic font-oswald uppercase">FAQ Management</div>;
const Users = () => <div className="text-3xl font-black italic font-oswald uppercase">User Management</div>;
const Settings = () => <div className="text-3xl font-black italic font-oswald uppercase">Settings Management</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="faqs" element={<FAQs />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
