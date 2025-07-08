import React, { useState } from 'react';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
interface Unit {
  id: number;
  name: string;
  shortName: string;
  description: string;
}
const UnitCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Unit, 'id'>>({
    name: '',
    shortName: '',
    description: ''
  });
  // For demonstration - in a real app this would be connected to global state or API
  const [recentUnits, setRecentUnits] = useState<Unit[]>([{
    id: 1,
    name: 'Piece',
    shortName: 'pc',
    description: 'Individual item'
  }, {
    id: 2,
    name: 'Kilogram',
    shortName: 'kg',
    description: 'Weight measurement'
  }]);
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
    // Create a new unit with a mock ID
    const newId = Math.max(0, ...recentUnits.map(u => u.id)) + 1;
    const newUnit = {
      id: newId,
      ...formData
    };
    // Add to recent units (in a real app, this would save to a database)
    setRecentUnits([newUnit, ...recentUnits]);
    // Reset form
    setFormData({
      name: '',
      shortName: '',
      description: ''
    });
    // Show success message
    alert('Unit created successfully!');
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create New Unit
        </h1>
        <Link to="/units" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Units
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unit Creation Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Unit Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Name
                </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter unit name" required />
              </div>
              <div>
                <label htmlFor="shortName" className="block text-sm font-medium text-gray-700 mb-1">
                  Short Name/Symbol
                </label>
                <input type="text" id="shortName" name="shortName" value={formData.shortName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., kg, pc, m" required />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe the unit's purpose and usage"></textarea>
              </div>
              <div className="pt-4">
                <button type="submit" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
                  <SaveIcon className="h-5 w-5 mr-2" />
                  Create Unit
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Recently Created Units */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Recently Created Units
            </h2>
            {recentUnits.length > 0 ? <div className="space-y-3">
                {recentUnits.slice(0, 5).map(unit => <div key={unit.id} className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {unit.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Symbol: {unit.shortName}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        New
                      </span>
                    </div>
                    {unit.description && <p className="mt-1 text-sm text-gray-600 truncate">
                        {unit.description}
                      </p>}
                  </div>)}
              </div> : <p className="text-gray-500">No units created yet.</p>}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <Link to="/units" className="text-sm text-blue-600 hover:text-blue-800">
                View all units →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default UnitCreationPage;