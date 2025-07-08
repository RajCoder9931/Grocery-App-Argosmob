import React, { useState } from 'react';
import { PlusIcon, SearchIcon, PencilIcon, TrashIcon } from 'lucide-react';
import ProductForm from './ProductForm';
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  unit: string;
}
const ProductsPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  // Mock data
  const [products, setProducts] = useState<Product[]>([{
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 129.99,
    stock: 45,
    description: 'High-quality wireless headphones with noise cancellation',
    unit: 'piece'
  }, {
    id: 2,
    name: 'Smart Watch Pro',
    category: 'Electronics',
    price: 199.99,
    stock: 32,
    description: 'Advanced smartwatch with health monitoring features',
    unit: 'piece'
  }, {
    id: 3,
    name: 'Ergonomic Chair',
    category: 'Furniture',
    price: 249.99,
    stock: 18,
    description: 'Comfortable office chair with lumbar support',
    unit: 'piece'
  }, {
    id: 4,
    name: 'Laptop Stand',
    category: 'Accessories',
    price: 39.99,
    stock: 64,
    description: 'Adjustable aluminum laptop stand',
    unit: 'piece'
  }, {
    id: 5,
    name: 'Mechanical Keyboard',
    category: 'Electronics',
    price: 89.99,
    stock: 27,
    description: 'Mechanical gaming keyboard with RGB lighting',
    unit: 'piece'
  }]);
  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };
  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };
  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      // Add new product with a new ID
      const newId = Math.max(0, ...products.map(p => p.id)) + 1;
      setProducts([...products, {
        ...product,
        id: newId
      }]);
    }
    setIsFormOpen(false);
  };
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          Products
        </h1>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search products..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <button onClick={handleAddProduct} className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Product
          </button>
        </div>
      </div>
      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map(product => <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {product.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEditProduct(product)} className="text-blue-600 hover:text-blue-900 mr-3">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>)}
              {filteredProducts.length === 0 && <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No products found
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
      {/* Product Form Modal */}
      {isFormOpen && <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={() => setIsFormOpen(false)} />}
    </div>;
};
export default ProductsPage;