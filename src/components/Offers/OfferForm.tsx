import React, { useEffect, useState } from 'react';
import { XIcon } from 'lucide-react';
interface Offer {
  id: number;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired';
  products: string[];
}
interface OfferFormProps {
  offer: Offer | null;
  onSave: (offer: Offer) => void;
  onCancel: () => void;
}
const OfferForm: React.FC<OfferFormProps> = ({
  offer,
  onSave,
  onCancel
}) => {
  // Mock product categories for the form
  const productCategories = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Stationery', 'Accessories', 'All Categories'];
  const [formData, setFormData] = useState<Omit<Offer, 'id'>>({
    title: '',
    description: '',
    discountType: 'percentage',
    discountValue: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'inactive',
    products: []
  });
  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title,
        description: offer.description,
        discountType: offer.discountType,
        discountValue: offer.discountValue,
        startDate: offer.startDate,
        endDate: offer.endDate,
        status: offer.status,
        products: offer.products
      });
    }
  }, [offer]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value) || 0
    });
  };
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedProducts = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedProducts.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      products: selectedProducts
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: offer?.id || 0,
      ...formData
    });
  };
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {offer ? 'Edit Offer' : 'Add New Offer'}
              </h3>
              <button onClick={onCancel} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Offer Title
                </label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={2} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="discountType" className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Type
                  </label>
                  <select id="discountType" name="discountType" value={formData.discountType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Value
                  </label>
                  <input type="number" id="discountValue" name="discountValue" value={formData.discountValue} onChange={handleNumberChange} min="0" max={formData.discountType === 'percentage' ? 100 : undefined} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="products" className="block text-sm font-medium text-gray-700 mb-1">
                  Applicable Products/Categories
                </label>
                <select id="products" name="products" multiple value={formData.products} onChange={handleProductChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" size={4}>
                  {productCategories.map(category => <option key={category} value={category}>
                      {category}
                    </option>)}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Hold Ctrl/Cmd to select multiple options
                </p>
              </div>
              <div className="flex justify-end pt-2">
                <button type="button" onClick={onCancel} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                  {offer ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>;
};
export default OfferForm;