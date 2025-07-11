import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
  description: string;
  productsCount: number;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<{ name: string; description: string }>({
    name: '',
    description: ''
  });

  const API_URL = 'https://grocery-app-argosmob.onrender.com/api/categories';


  //  Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  //  Add category button
  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
    setIsFormOpen(true);
  };

  //  Edit category button
  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description
    });
    setIsFormOpen(true);
  };

  //  Delete category
  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchCategories(); // refresh
      } catch (err) {
        console.error('Failed to delete', err);
      }
    }
  };

  //  Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //  Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.put(`${API_URL}/${editingCategory._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      fetchCategories();
      setIsFormOpen(false);
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Categories</h1>
        <button
          onClick={handleAddCategory}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Products</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{category.productsCount}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="mr-2 px-4 py-2 bg-white border border-gray-300 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {editingCategory ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
