import { Outlet } from 'react-router-dom';
import AdminNav from '../component/AdminNav';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen mt-16">
      <AdminNav />
      <div className="flex-1 p-6 ml-64"> {/* Adjust ml-64 based on your sidebar width */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;