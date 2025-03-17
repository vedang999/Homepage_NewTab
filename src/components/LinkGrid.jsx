// components/LinkGrid.jsx
import React from 'react';

const LinkGrid = ({ links, removeLink, columns }) => {
  return (
    <div className="link-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {links.map(link => (
        <div className="link-card" key={link.id}>
          <div className="link-actions">
            <button onClick={() => removeLink(link.id)} className="link-delete">
              <span className="material-icons">close</span>
            </button>
          </div>
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            <div className="link-icon">
              {link.icon ? (
                <img src={link.icon} alt={link.name} />
              ) : (
                <div className="default-icon">
                  {link.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="link-name">{link.name}</div>
          </a>
        </div>
      ))}
    </div>
  );
};
export default LinkGrid;