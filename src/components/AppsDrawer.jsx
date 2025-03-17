// components/AppsDrawer.jsx
import React, { useState, useEffect } from 'react';

const AppsDrawer = ({ apps = [] }) => {
  // This provides a default empty array if apps is undefined
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Debug logging when component mounts
    console.log('AppsDrawer component rendered');
    console.log('Apps received:', apps);
  }, [apps]);
  
  const toggleDrawer = () => {
    console.log('Toggle drawer called, current state:', isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <div className="apps-drawer-container">
      <button className="icon-button" onClick={toggleDrawer}>
        <span className="material-icons">apps</span>
      </button>
      
      {isOpen && (
        <div className="apps-drawer">
          <div className="apps-grid">
            {apps && apps.length > 0 ? (
              apps.map(app => (
                <a href={app.url} target="_blank" rel="noopener noreferrer" key={app.id} className="app-item">
                  <img src={app.icon} alt={app.name} />
                  <span>{app.name}</span>
                </a>
              ))
            ) : (
              <p>No apps available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppsDrawer;