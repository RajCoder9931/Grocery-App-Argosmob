import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { XIcon } from 'lucide-react';

interface Offer {
  _id?: string;
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

const OfferForm: React.FC<OfferFormProps> = ({ offer, onSave, onCancel }) => {
  const productCategories = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Stationery', 'Accessories', 'All Categories'];

  const [formData, setFormData] = useState<Omit<Offer, '_id'>>({
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) || 0 });
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedProducts: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) selectedProducts.push(options[i].value);
    }
    setFormData({ ...formData, products: selectedProducts });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      _id: offer?._id  // ← include _id if editing
    };

    try {
      let response;
      if (offer?._id) {
        // Update offer
        response = await axios.put(`http://localhost:5000/api/offers/${offer._id}`, payload);
        alert('Offer updated successfully!');
      } else {
        // Create new offer
        response = await axios.post(`http://localhost:5000/api/offers`, payload);
        alert('Offer created successfully!');
      }
      onSave(response.data);
    } catch (error) {
      console.error('Failed to save offer:', error);
      alert('Error saving offer.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 opacity-75" />
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full z-50 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">{offer ? 'Edit Offer' : 'Add New Offer'}</h3>
            <button onClick={onCancel}>
              <XIcon className="h-6 w-6 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
              <div className="grid grid-cols-2 gap-4">
                <select name="discountType" value={formData.discountType} onChange={handleChange} className="w-full border p-2 rounded">
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </select>
                <input type="number" name="discountValue" value={formData.discountValue} onChange={handleNumberChange} className="w-full border p-2 rounded" placeholder="Discount" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full border p-2 rounded" />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full border p-2 rounded" />
              </div>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
              </select>
              <select multiple name="products" value={formData.products} onChange={handleProductChange} className="w-full border p-2 rounded" size={5}>
                {productCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="flex justify-end space-x-2 pt-4">
                <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{offer ? 'Update' : 'Create'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfferForm;
//done hi edit and create