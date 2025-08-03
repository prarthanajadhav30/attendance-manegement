import React from "react";

const FormField = ({ label, children, error }) => (
  <div className="mb-4">
    {label && <label className="block mb-1 font-semibold text-gray-700">{label}</label>}
    {children}
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
);

const ReusableForm = ({ fields, onSubmit, submitLabel, loading, error, onCancel }) => {
  const [values, setValues] = React.useState(() => {
    const initial = {};
    fields.forEach(f => { initial[f.name] = f.value || ""; });
    return initial;
  });
  const [localError, setLocalError] = React.useState("");

  const handleChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    try {
      await onSubmit(values);
    } catch (err) {
      setLocalError(err.message || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(field => (
        <FormField key={field.name} label={field.label} error={field.error}>
          {field.type === "select" ? (
            <select
              className="w-full px-3 py-2 border rounded"
              value={values[field.name]}
              onChange={e => handleChange(field.name, e.target.value)}
              required={field.required}
            >
              <option value="">{field.placeholder || `-- Select ${field.label} --`}</option>
              {field.options && field.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type || "text"}
              className="w-full px-3 py-2 border rounded"
              value={values[field.name]}
              onChange={e => handleChange(field.name, e.target.value)}
              required={field.required}
              placeholder={field.placeholder}
            />
          )}
        </FormField>
      ))}
      {(error || localError) && <div className="text-red-500 text-sm">{error || localError}</div>}
      <div className="flex justify-end gap-2 mt-4">
        {onCancel && <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={onCancel} disabled={loading}>Cancel</button>}
        <button type="submit" className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700" disabled={loading}>{loading ? "Processing..." : submitLabel || "Submit"}</button>
      </div>
    </form>
  );
};

export { FormField, ReusableForm };
