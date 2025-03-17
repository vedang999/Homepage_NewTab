
// components/TabsContainer.jsx
import React, { useState } from 'react';

const TabsContainer = ({ tabs, activeTab, setActiveTab, addTab, removeTab }) => {
  const [newTabName, setNewTabName] = useState('');
  const [showAddTab, setShowAddTab] = useState(false);

  const handleAddTab = (e) => {
    e.preventDefault();
    if (newTabName.trim()) {
      addTab(newTabName);
      setNewTabName('');
      setShowAddTab(false);
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map(tab => (
          <div 
            key={tab.id} 
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
            {tabs.length > 1 && (
              <button 
                className="tab-close" 
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
              >
                <span className="material-icons">close</span>
              </button>
            )}
          </div>
        ))}
        {showAddTab ? (
          <form onSubmit={handleAddTab} className="add-tab-form">
            <input
              type="text"
              value={newTabName}
              onChange={(e) => setNewTabName(e.target.value)}
              placeholder="Tab name"
              autoFocus
            />
            <button type="submit">Add</button>
            <button type="button" onClick={() => setShowAddTab(false)}>Cancel</button>
          </form>
        ) : (
          <button className="add-tab-button" onClick={() => setShowAddTab(true)}>
            <span className="material-icons">add</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TabsContainer;