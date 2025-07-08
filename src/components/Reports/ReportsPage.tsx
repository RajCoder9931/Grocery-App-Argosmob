import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
const ReportsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [chartType, setChartType] = useState<'sales' | 'products' | 'categories'>('sales');
  // Mock data for sales by time period
  const salesData = {
    week: [{
      name: 'Mon',
      sales: 1200
    }, {
      name: 'Tue',
      sales: 1800
    }, {
      name: 'Wed',
      sales: 1500
    }, {
      name: 'Thu',
      sales: 2000
    }, {
      name: 'Fri',
      sales: 2400
    }, {
      name: 'Sat',
      sales: 1800
    }, {
      name: 'Sun',
      sales: 1200
    }],
    month: [{
      name: 'Week 1',
      sales: 8500
    }, {
      name: 'Week 2',
      sales: 10200
    }, {
      name: 'Week 3',
      sales: 9800
    }, {
      name: 'Week 4',
      sales: 12000
    }],
    year: [{
      name: 'Jan',
      sales: 24000
    }, {
      name: 'Feb',
      sales: 26000
    }, {
      name: 'Mar',
      sales: 29000
    }, {
      name: 'Apr',
      sales: 31000
    }, {
      name: 'May',
      sales: 28000
    }, {
      name: 'Jun',
      sales: 32000
    }, {
      name: 'Jul',
      sales: 35000
    }, {
      name: 'Aug',
      sales: 37000
    }, {
      name: 'Sep',
      sales: 34000
    }, {
      name: 'Oct',
      sales: 36000
    }, {
      name: 'Nov',
      sales: 38000
    }, {
      name: 'Dec',
      sales: 42000
    }]
  };
  // Mock data for product sales
  const productSalesData = [{
    name: 'Wireless Headphones',
    value: 25
  }, {
    name: 'Smart Watch Pro',
    value: 18
  }, {
    name: 'Laptop Stand',
    value: 15
  }, {
    name: 'Mechanical Keyboard',
    value: 12
  }, {
    name: 'Ergonomic Chair',
    value: 10
  }, {
    name: 'Other Products',
    value: 20
  }];
  // Mock data for category sales
  const categorySalesData = [{
    name: 'Electronics',
    value: 45
  }, {
    name: 'Furniture',
    value: 20
  }, {
    name: 'Accessories',
    value: 15
  }, {
    name: 'Clothing',
    value: 12
  }, {
    name: 'Books',
    value: 8
  }];
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  const renderBarChart = () => {
    const data = salesData[timeRange];
    return <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={value => [`$${value}`, 'Sales']} />
          <Legend />
          <Bar dataKey="sales" name="Sales ($)" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>;
  };
  const renderPieChart = () => {
    const data = chartType === 'products' ? productSalesData : categorySalesData;
    return <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={true} label={({
          name,
          percent
        }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={150} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={value => [`${value}%`, 'Percentage']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>;
  };
  return <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Reports</h1>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              Chart Type
            </h2>
            <div className="flex space-x-2">
              <button onClick={() => setChartType('sales')} className={`px-4 py-2 rounded-md ${chartType === 'sales' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                Sales Over Time
              </button>
              <button onClick={() => setChartType('products')} className={`px-4 py-2 rounded-md ${chartType === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                Product Sales
              </button>
              <button onClick={() => setChartType('categories')} className={`px-4 py-2 rounded-md ${chartType === 'categories' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                Category Sales
              </button>
            </div>
          </div>
          {chartType === 'sales' && <div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                Time Range
              </h2>
              <div className="flex space-x-2">
                <button onClick={() => setTimeRange('week')} className={`px-4 py-2 rounded-md ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                  Weekly
                </button>
                <button onClick={() => setTimeRange('month')} className={`px-4 py-2 rounded-md ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                  Monthly
                </button>
                <button onClick={() => setTimeRange('year')} className={`px-4 py-2 rounded-md ${timeRange === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                  Yearly
                </button>
              </div>
            </div>}
        </div>
        <div className="mt-6">
          {chartType === 'sales' ? renderBarChart() : renderPieChart()}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Sales Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-600">Total Sales (Current Month)</span>
              <span className="text-lg font-semibold text-gray-800">
                $42,500
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-600">Average Order Value</span>
              <span className="text-lg font-semibold text-gray-800">
                $128.75
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-600">Total Orders</span>
              <span className="text-lg font-semibold text-gray-800">330</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Conversion Rate</span>
              <span className="text-lg font-semibold text-gray-800">3.2%</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Top Selling Products
          </h2>
          <div className="space-y-4">
            {productSalesData.slice(0, 5).map((product, index) => <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-600">{product.name}</span>
                <span className="text-gray-800 font-medium">
                  {product.value}%
                </span>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default ReportsPage;