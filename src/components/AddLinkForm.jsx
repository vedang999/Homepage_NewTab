// components/AddLinkForm.jsx
import React, { useState } from 'react';

const AddLinkForm = ({ addLink, onCancel }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate URL format
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setUrl('https://' + url);
    }
    addLink({ name, url: url.startsWith('http') ? url : 'https://' + url, icon });
  };

  // Function to generate favicon URL
  const generateFaviconUrl = () => {
    if (!url) return;
    
    let domain = url;
    if (!domain.startsWith('http')) {
      domain = 'https://' + domain;
    }
    
    try {
      const urlObj = new URL(domain);
      setIcon(`https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=64`);
    } catch (e) {
      console.error('Invalid URL');
    }
  };

  return (
    <div className="add-link-form">
      <h2>Add New Shortcut</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Google"
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="https://google.com"
            onBlur={generateFaviconUrl}
          />
        </div>
        <div className="form-group">
          <label htmlFor="icon">Icon URL (optional)</label>
          <input
            type="text"
            id="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="https://example.com/icon.png"
          />
          {icon && (
            <div className="icon-preview">
              <img src={icon} alt="Icon preview" />
            </div>
          )}
        </div>
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Add Shortcut
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddLinkForm;