import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, UserIcon } from 'lucide-react';
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  lastLogin: string;
}
const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([{
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    permissions: ['all'],
    lastLogin: '2023-06-15 10:30:00'
  }, {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Manager',
    permissions: ['view_products', 'edit_products', 'view_orders'],
    lastLogin: '2023-06-14 15:45:00'
  }, {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Staff',
    permissions: ['view_products', 'view_orders'],
    lastLogin: '2023-06-13 09:15:00'
  }]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  // Available permissions for the form
  const availablePermissions = [{
    id: 'view_products',
    label: 'View Products'
  }, {
    id: 'edit_products',
    label: 'Edit Products'
  }, {
    id: 'delete_products',
    label: 'Delete Products'
  }, {
    id: 'view_categories',
    label: 'View Categories'
  }, {
    id: 'edit_categories',
    label: 'Edit Categories'
  }, {
    id: 'view_orders',
    label: 'View Orders'
  }, {
    id: 'edit_orders',
    label: 'Edit Orders'
  }, {
    id: 'view_reports',
    label: 'View Reports'
  }, {
    id: 'manage_users',
    label: 'Manage Users'
  }, {
    id: 'all',
    label: 'All Permissions'
  }];
  // Available roles
  const roles = ['Administrator', 'Manager', 'Staff'];
  const [formData, setFormData] = useState<Omit<User, 'id' | 'lastLogin'>>({
    name: '',
    email: '',
    role: 'Staff',
    permissions: []
  });
  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'Staff',
      permissions: []
    });
    setIsFormOpen(true);
  };
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: [...user.permissions]
    });
    setIsFormOpen(true);
  };
  const handleDeleteUser = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // If role is Administrator, automatically set all permissions
    if (name === 'role' && value === 'Administrator') {
      setFormData(prev => ({
        ...prev,
        permissions: ['all']
      }));
    } else if (name === 'role' && formData.permissions.includes('all')) {
      // If changing from Administrator to another role, reset permissions
      setFormData(prev => ({
        ...prev,
        permissions: []
      }));
    }
  };
  const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      value,
      checked
    } = e.target;
    // Handle "All Permissions" checkbox
    if (value === 'all') {
      if (checked) {
        setFormData({
          ...formData,
          permissions: ['all']
        });
      } else {
        setFormData({
          ...formData,
          permissions: []
        });
      }
      return;
    }
    // If "All Permissions" is already checked and user selects another permission, uncheck "All Permissions"
    if (formData.permissions.includes('all')) {
      setFormData({
        ...formData,
        permissions: [value]
      });
      return;
    }
    // Handle individual permission checkboxes
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, value]
      });
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(p => p !== value)
      });
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      // Update existing user
      setUsers(users.map(u => u.id === editingUser.id ? {
        ...u,
        ...formData
      } : u));
    } else {
      // Add new user
      const newId = Math.max(0, ...users.map(u => u.id)) + 1;
      const now = new Date().toISOString().replace('T', ' ').substr(0, 19);
      setUsers([...users, {
        id: newId,
        ...formData,
        lastLogin: now
      }]);
    }
    setIsFormOpen(false);
  };
  return <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
          Users
        </h1>
        <button onClick={handleAddUser} className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>
      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Permissions
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'Administrator' ? 'bg-purple-100 text-purple-800' : user.role === 'Manager' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {user.permissions.includes('all') ? 'All Permissions' : user.permissions.map(p => {
                    const permission = availablePermissions.find(ap => ap.id === p);
                    return permission ? permission.label : p;
                  }).join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEditUser(user)} className="text-blue-600 hover:text-blue-900 mr-3">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900" disabled={user.role === 'Administrator' && users.filter(u => u.role === 'Administrator').length === 1}>
                      <TrashIcon className={`h-5 w-5 ${user.role === 'Administrator' && users.filter(u => u.role === 'Administrator').length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* User Form Modal */}
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
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                      {roles.map(role => <option key={role} value={role}>
                          {role}
                        </option>)}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Permissions
                    </label>
                    <div className="max-h-48 overflow-y-auto p-2 border border-gray-300 rounded-md">
                      {availablePermissions.map(permission => <div key={permission.id} className="flex items-center mb-2">
                          <input type="checkbox" id={`permission-${permission.id}`} value={permission.id} checked={formData.permissions.includes(permission.id)} onChange={handlePermissionChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" disabled={permission.id !== 'all' && formData.permissions.includes('all')} />
                          <label htmlFor={`permission-${permission.id}`} className="ml-2 block text-sm text-gray-900">
                            {permission.label}
                          </label>
                        </div>)}
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                      {editingUser ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default UsersPage;