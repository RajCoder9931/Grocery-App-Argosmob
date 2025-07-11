
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';

interface Unit {
  _id: string;
  name: string;
  shortName: string;
  description: string;
}

const UnitsPage: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [formData, setFormData] = useState<Omit<Unit, '_id'>>({
    name: '',
    shortName: '',
    description: ''
  });

  const API_URL = 'http://localhost:5000/api/units';

  // Load units on component mount
  const fetchUnits = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log('API Response:', res.data);
      const data = Array.isArray(res.data) ? res.data : res.data.units;
      setUnits(data || []);
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUnit) {
        await axios.put(`${API_URL}/${editingUnit._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setIsFormOpen(false);
      setFormData({ name: '', shortName: '', description: '' });
      setEditingUnit(null);
      fetchUnits();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (unit: Unit) => {
    setEditingUnit(unit);
    setFormData({
      name: unit.name,
      shortName: unit.shortName,
      description: unit.description
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this unit?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchUnits();
      } catch (error) {
        console.error('Error deleting unit:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Units</h2>
        <button
          onClick={() => {
            setEditingUnit(null);
            setFormData({ name: '', shortName: '', description: '' });
            setIsFormOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Unit
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Short Name</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(units) && units.length > 0 ? (
              units.map(unit => (
                <tr key={unit._id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{unit.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{unit.shortName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{unit.description}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(unit)} className="text-blue-600 hover:text-blue-800 mr-3">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(unit._id)} className="text-red-600 hover:text-red-800">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No units found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingUnit ? 'Edit Unit' : 'Add New Unit'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Short Name</label>
                <input
                  type="text"
                  name="shortName"
                  value={formData.shortName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="mr-2 px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  {editingUnit ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitsPage;
