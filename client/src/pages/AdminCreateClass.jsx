import React, { useState } from 'react';
import { ReusableForm } from '../components/ReusableForm';

const AdminCreateClass = ({ onClose, onCreated }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fields = [
    {
      name: 'name',
      label: 'Class Name',
      type: 'text',
      required: true,
      placeholder: 'Enter class name',
    },
    {
      name: 'section',
      label: 'Section',
      type: 'text',
      required: true,
      placeholder: 'Enter section',
    },
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: values.name, section: values.section }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to create class');
      if (onCreated) onCreated();
      if (onClose) onClose();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Class</h2>
      <ReusableForm
        fields={fields}
        onSubmit={handleSubmit}
        submitLabel="Add Class"
        loading={loading}
        error={error}
        onCancel={onClose}
      />
    </div>
  );
};

export default AdminCreateClass;
