// components/Settings.jsx
import React, { useState } from 'react';

const Settings = ({ settings, updateSettings, onCancel }) => {
  const [formData, setFormData] = useState({ ...settings });
  
  // Predefined background images
  const defaultBackgrounds = [
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6",
    "https://images.unsplash.com/photo-1542224566-6e85f2e6772f",
    "https://lh3.googleusercontent.com/7dDTGGkcda-tnTeK8VG6uE-hGr3gXqXtgouGBNp8Tpro3ddAdFC75UyFeQ_5RzDi4RLyBPqk3XqYkCsGieBr74cONg=s1600-w1600-h1000"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const selectBackgroundImage = (imageUrl) => {
    setFormData({
      ...formData,
      backgroundImage: imageUrl,
      background: 'image'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div className="settings-form">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
          >
            <option value="auto">Auto (System)</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="background">Background</label>
          <select
            id="background"
            name="background"
            value={formData.background}
            onChange={handleChange}
          >
            <option value="gradient">Gradient</option>
            <option value="color">Solid Color</option>
            <option value="image">Image</option>
          </select>
        </div>
        
        {(formData.background === 'gradient' || formData.background === 'color') && (
          <div className="form-group">
            <label htmlFor="backgroundColor">Background Color</label>
            <input
              type="color"
              id="backgroundColor"
              name="backgroundColor"
              value={formData.backgroundColor}
              onChange={handleChange}
            />
          </div>
        )}
        
        {formData.background === 'image' && (
          <>
            <div className="form-group">
              <label>Choose a Background Image</label>
              <div className="background-image-gallery">
                {defaultBackgrounds.map((img, index) => (
                  <div 
                    key={index} 
                    className={`gallery-image ${formData.backgroundImage === img ? 'selected' : ''}`}
                    onClick={() => selectBackgroundImage(img)}
                  >
                    <img src={img} alt={`Background option ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="backgroundImage">Or Enter Custom Image URL</label>
              <input
                type="text"
                id="backgroundImage"
                name="backgroundImage"
                value={formData.backgroundImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              {formData.backgroundImage && !defaultBackgrounds.includes(formData.backgroundImage) && (
                <div className="image-preview">
                  <img src={formData.backgroundImage} alt="Custom background preview" />
                </div>
              )}
            </div>
          </>
        )}
        
        <div className="form-group">
          <label htmlFor="columns">Grid Columns</label>
          <input
            type="range"
            id="columns"
            name="columns"
            min="2"
            max="8"
            value={formData.columns}
            onChange={handleChange}
          />
          <span>{formData.columns}</span>
        </div>
        
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="showClock"
            name="showClock"
            checked={formData.showClock}
            onChange={handleChange}
          />
          <label htmlFor="showClock">Show Clock</label>
        </div>
        
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="showSearch"
            name="showSearch"
            checked={formData.showSearch}
            onChange={handleChange}
          />
          <label htmlFor="showSearch">Show Search Bar</label>
        </div>
        
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="showTodoList"
            name="showTodoList"
            checked={formData.showTodoList}
            onChange={handleChange}
          />
          <label htmlFor="showTodoList">Show Todo List</label>
        </div>
        
        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="showAppsDrawer"
            name="showAppsDrawer"
            checked={formData.showAppsDrawer}
            onChange={handleChange}
          />
          <label htmlFor="showAppsDrawer">Show Apps Drawer</label>
        </div>
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;