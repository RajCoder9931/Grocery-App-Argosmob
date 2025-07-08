import React, { useState } from 'react';
import { SearchIcon, EyeIcon, TrashIcon, DownloadIcon } from 'lucide-react';
interface Order {
  id: number;
  customer: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}
const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  // Mock data
  const [orders, setOrders] = useState<Order[]>([{
    id: 1001,
    customer: 'John Doe',
    date: '2023-06-15',
    status: 'delivered',
    total: 249.99,
    items: 3
  }, {
    id: 1002,
    customer: 'Jane Smith',
    date: '2023-06-14',
    status: 'shipped',
    total: 129.5,
    items: 2
  }, {
    id: 1003,
    customer: 'Robert Johnson',
    date: '2023-06-14',
    status: 'processing',
    total: 345.75,
    items: 4
  }, {
    id: 1004,
    customer: 'Emily Davis',
    date: '2023-06-13',
    status: 'pending',
    total: 89.99,
    items: 1
  }, {
    id: 1005,
    customer: 'Michael Brown',
    date: '2023-06-12',
    status: 'cancelled',
    total: 199.99,
    items: 2
  }, {
    id: 1006,
    customer: 'Sarah Wilson',
    date: '2023-06-10',
    status: 'delivered',
    total: 159.95,
    items: 3
  }, {
    id: 1007,
    customer: 'David Miller',
    date: '2023-06-09',
    status: 'delivered',
    total: 299.99,
    items: 2
  }]);
  // Mock order details
  const orderDetails = {
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, Anytown, CA 12345'
    },
    items: [{
      id: 1,
      name: 'Wireless Headphones',
      quantity: 1,
      price: 129.99
    }, {
      id: 2,
      name: 'Laptop Stand',
      quantity: 1,
      price: 39.99
    }, {
      id: 3,
      name: 'Mechanical Keyboard',
      quantity: 1,
      price: 89.99
    }],
    payment: {
      method: 'Credit Card',
      cardNumber: '**** **** **** 4567',
      subtotal: 259.97,
      shipping: 0,
      tax: 20.8,
      total: 280.77
    },
    tracking: {
      number: 'TRK123456789',
      carrier: 'FedEx',
      estimatedDelivery: '2023-06-18'
    }
  };
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };
  const handleDeleteOrder = (id: number) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== id));
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder(null);
      }
    }
  };
  const handleDownloadPdf = (id: number) => {
    // In a real app, this would generate and download a PDF
    alert(`Downloading PDF for Order #${id}`);
  };
  const filteredOrders = orders.filter(order => order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toString().includes(searchTerm));
  const getStatusBadgeClass = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          Orders
        </h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map(order => <tr key={order.id} className={`${selectedOrder?.id === order.id ? 'bg-blue-50' : 'hover:bg-gray-50'} cursor-pointer`} onClick={() => handleViewOrder(order)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.customer}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={e => {
                      e.stopPropagation();
                      handleViewOrder(order);
                    }} className="text-blue-600 hover:text-blue-900 mr-3">
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button onClick={e => {
                      e.stopPropagation();
                      handleDownloadPdf(order.id);
                    }} className="text-green-600 hover:text-green-900 mr-3">
                          <DownloadIcon className="h-5 w-5" />
                        </button>
                        <button onClick={e => {
                      e.stopPropagation();
                      handleDeleteOrder(order.id);
                    }} className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>)}
                  {filteredOrders.length === 0 && <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No orders found
                      </td>
                    </tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Order Details */}
        <div className="lg:col-span-1">
          {selectedOrder ? <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Order #{selectedOrder.id}
                </h2>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedOrder.status)}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Customer Information
                </h3>
                <p className="text-sm text-gray-900 mb-1">
                  {orderDetails.customer.name}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  {orderDetails.customer.email}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  {orderDetails.customer.phone}
                </p>
                <p className="text-sm text-gray-500">
                  {orderDetails.customer.address}
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Order Items
                </h3>
                {orderDetails.items.map(item => <div key={item.id} className="flex justify-between mb-2">
                    <div className="text-sm text-gray-900">
                      {item.name}{' '}
                      <span className="text-gray-500">x{item.quantity}</span>
                    </div>
                    <div className="text-sm text-gray-900">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>)}
              </div>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Payment Information
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  {orderDetails.payment.method}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {orderDetails.payment.cardNumber}
                </p>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-sm text-gray-900">
                    ${orderDetails.payment.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-500">Shipping</span>
                  <span className="text-sm text-gray-900">
                    ${orderDetails.payment.shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Tax</span>
                  <span className="text-sm text-gray-900">
                    ${orderDetails.payment.tax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-sm text-gray-900">Total</span>
                  <span className="text-sm text-gray-900">
                    ${orderDetails.payment.total.toFixed(2)}
                  </span>
                </div>
              </div>
              {selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered' ? <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Shipping Information
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    Tracking: {orderDetails.tracking.number}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Carrier: {orderDetails.tracking.carrier}
                  </p>
                  <p className="text-sm text-gray-500">
                    Estimated Delivery:{' '}
                    {new Date(orderDetails.tracking.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div> : null}
              <div className="mt-6 flex justify-end">
                <button onClick={() => handleDownloadPdf(selectedOrder.id)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                  <DownloadIcon className="h-5 w-5 mr-2" />
                  Download Invoice
                </button>
              </div>
            </div> : <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-500">Select an order to view details</p>
            </div>}
        </div>
      </div>
    </div>;
};
export default OrdersPage;