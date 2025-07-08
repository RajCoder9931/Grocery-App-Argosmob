import React, { useState } from 'react';
import { PlusIcon, SearchIcon, PencilIcon, TrashIcon, Calendar, Tag } from 'lucide-react';
import OfferForm from './OfferForm';
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
const OffersPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  // Mock data
  const [offers, setOffers] = useState<Offer[]>([{
    id: 1,
    title: 'Summer Sale',
    description: 'Get 20% off on all electronics',
    discountType: 'percentage',
    discountValue: 20,
    startDate: '2023-06-01',
    endDate: '2023-07-31',
    status: 'active',
    products: ['Electronics', 'Accessories']
  }, {
    id: 2,
    title: 'Back to School',
    description: '$10 off on stationery items',
    discountType: 'fixed',
    discountValue: 10,
    startDate: '2023-08-01',
    endDate: '2023-09-15',
    status: 'inactive',
    products: ['Stationery', 'Books']
  }, {
    id: 3,
    title: 'Black Friday',
    description: 'Up to 50% off on selected items',
    discountType: 'percentage',
    discountValue: 50,
    startDate: '2023-11-24',
    endDate: '2023-11-27',
    status: 'inactive',
    products: ['All Categories']
  }, {
    id: 4,
    title: 'Holiday Special',
    description: '15% discount on furniture',
    discountType: 'percentage',
    discountValue: 15,
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    status: 'inactive',
    products: ['Furniture']
  }, {
    id: 5,
    title: 'Clearance Sale',
    description: 'Get $25 off on orders above $100',
    discountType: 'fixed',
    discountValue: 25,
    startDate: '2023-05-15',
    endDate: '2023-06-15',
    status: 'expired',
    products: ['All Categories']
  }]);
  const handleAddOffer = () => {
    setEditingOffer(null);
    setIsFormOpen(true);
  };
  const handleEditOffer = (offer: Offer) => {
    setEditingOffer(offer);
    setIsFormOpen(true);
  };
  const handleDeleteOffer = (id: number) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(offer => offer.id !== id));
    }
  };
  const handleSaveOffer = (offer: Offer) => {
    if (editingOffer) {
      // Update existing offer
      setOffers(offers.map(o => o.id === offer.id ? offer : o));
    } else {
      // Add new offer with a new ID
      const newId = Math.max(0, ...offers.map(o => o.id)) + 1;
      setOffers([...offers, {
        ...offer,
        id: newId
      }]);
    }
    setIsFormOpen(false);
  };
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const filteredOffers = offers.filter(offer => offer.title.toLowerCase().includes(searchTerm.toLowerCase()) || offer.description.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          Offers & Promotions
        </h1>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search offers..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <button onClick={handleAddOffer} className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Offer
          </button>
        </div>
      </div>
      {/* Offers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Offer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOffers.map(offer => <tr key={offer.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {offer.title}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {offer.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Tag className="h-4 w-4 mr-1 text-blue-500" />
                      {offer.discountType === 'percentage' ? `${offer.discountValue}% off` : `$${offer.discountValue} off`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                      <span>
                        {new Date(offer.startDate).toLocaleDateString()} -{' '}
                        {new Date(offer.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(offer.status)}`}>
                      {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {offer.products.join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEditOffer(offer)} className="text-blue-600 hover:text-blue-900 mr-3">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteOffer(offer.id)} className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>)}
              {filteredOffers.length === 0 && <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No offers found
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
      {/* Offer Form Modal */}
      {isFormOpen && <OfferForm offer={editingOffer} onSave={handleSaveOffer} onCancel={() => setIsFormOpen(false)} />}
    </div>;
};
export default OffersPage;