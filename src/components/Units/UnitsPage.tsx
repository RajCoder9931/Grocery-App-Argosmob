import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
interface Unit {
  id: number;
  name: string;
  shortName: string;
  description: string;
}
const UnitsPage: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>([{
    id: 1,
    name: 'Piece',
    shortName: 'pc',
    description: 'Individual item'
  }, {
    id: 2,
    name: 'Kilogram',
    shortName: 'kg',
    description: 'Weight measurement'
  }, {
    id: 3,
    name: 'Liter',
    shortName: 'L',
    description: 'Volume measurement'
  }, {
    id: 4,
    name: 'Meter',
    shortName: 'm',
    description: 'Length measurement'
  }, {
    id: 5,
    name: 'Set',
    shortName: 'set',
    description: 'Collection of items'
  }]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [formData, setFormData] = useState<Omit<Unit, 'id'>>({
    name: '',
    shortName: '',
    description: ''
  });
  const handleAddUnit = () => {
    setEditingUnit(null);
    setFormData({
      name: '',
      shortName: '',
      description: ''
    });
    setIsFormOpen(true);
  };
  const handleEditUnit = (unit: Unit) => {
    setEditingUnit(unit);
    setFormData({
      name: unit.name,
      shortName: unit.shortName,
      description: unit.description
    });
    setIsFormOpen(true);
  };
  const handleDeleteUnit = (id: number) => {
    if (window.confirm('Are you sure you want to delete this unit?')) {
      setUnits(units.filter(unit => unit.id !== id));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUnit) {
      // Update existing unit
      setUnits(units.map(u => u.id === editingUnit.id ? {
        ...u,
        ...formData
      } : u));
    } else {
      // Add new unit
      const newId = Math.max(0, ...units.map(u => u.id)) + 1;
      setUnits([...units, {
        id: newId,
        ...formData
      }]);
    }
    setIsFormOpen(false);
  };
  return <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          Units
        </h1>
        <div className="flex space-x-3">
          <Link to="/units/create" className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Unit
          </Link>
          <button onClick={handleAddUnit} className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
            <PlusIcon className="h-5 w-5 mr-2" />
            Quick Add
          </button>
        </div>
      </div>
      {/* Units Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Short Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {units.map(unit => <tr key={unit.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {unit.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {unit.shortName}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {unit.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEditUnit(unit)} className="text-blue-600 hover:text-blue-900 mr-3">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteUnit(unit.id)} className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* Unit Form Modal */}
      {isFormOpen && <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {editingUnit ? 'Edit Unit' : 'Add New Unit'}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Unit Name
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="shortName" className="block text-sm font-medium text-gray-700 mb-1">
                      Short Name
                    </label>
                    <input type="text" id="shortName" name="shortName" value={formData.shortName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={2} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                      {editingUnit ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default UnitsPage;