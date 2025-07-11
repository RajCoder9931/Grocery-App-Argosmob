import React from 'react';
import { UsersIcon, PackageIcon, ShoppingCartIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from './StatCard';
import RecentProducts from './RecentProducts';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate(); // React Router navigation hook

  // Mock data
  const stats = [
    {
      title: 'Total Customers',
      value: '1,248',
      icon: <UsersIcon className="h-8 w-8 text-blue-500" />,
      change: '+12%',
    },
    {
      title: 'Total Products',
      value: '356',
      icon: <PackageIcon className="h-8 w-8 text-green-500" />,
      change: '+5%',
    },
    {
      title: 'Total Orders',
      value: '2,845',
      icon: <ShoppingCartIcon className="h-8 w-8 text-purple-500" />,
      change: '+18%',
    },
  ];

  const recentProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: '$129.99',
      stock: 45,
      added: '2023-06-15',
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      category: 'Electronics',
      price: '$199.99',
      stock: 32,
      added: '2023-06-14',
    },
    {
      id: 3,
      name: 'Ergonomic Chair',
      category: 'Furniture',
      price: '$249.99',
      stock: 18,
      added: '2023-06-12',
    },
    {
      id: 4,
      name: 'Laptop Stand',
      category: 'Accessories',
      price: '$39.99',
      stock: 64,
      added: '2023-06-10',
    },
    {
      id: 5,
      name: 'Mechanical Keyboard',
      category: 'Electronics',
      price: '$89.99',
      stock: 27,
      added: '2023-06-08',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Recently Added Products
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="text-sm text-gray-500 hover:text-blue-500"
          >
            View All Products
          </button>
        </div>
        <RecentProducts products={recentProducts} />
      </div>
    </div>
  );
};

export default DashboardPage;
