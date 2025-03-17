// components/DataManagement.jsx
import React, { useState } from 'react';
import { exportAppData, importAppData, clearAllData } from '../utils/dataManagement';

const DataManagement = ({ onDataChanged }) => {
  const [importStatus, setImportStatus] = useState('');
  const [exportStatus, setExportStatus] = useState('');
  
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setImportStatus('Importing...');
    try {
      await importAppData(file);
      setImportStatus('Import successful! Reloading...');
      onDataChanged();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      setImportStatus('Import failed. Please try again with a valid backup file.');
    }
  };
  
  const handleExport = () => {
    setExportStatus('Exporting...');
    const result = exportAppData();
    if (result) {
      setExportStatus('Export successful!');
      setTimeout(() => {
        setExportStatus('');
      }, 3000);
    } else {
      setExportStatus('Export failed. Please try again.');
    }
  };
  
  const handleClear = () => {
    const cleared = clearAllData();
    if (cleared) {
      onDataChanged();
      window.location.reload();
    }
  };
  
  return (
    <div className="data-management">
      <h3>Data Management</h3>
      
      <div className="data-management-actions">
        <div className="import-section">
          <button className="btn-secondary" onClick={() => document.getElementById('import-file').click()}>
            Import Data
          </button>
          <input
            type="file"
            id="import-file"
            accept=".json"
            style={{ display: 'none' }}
            onChange={handleImport}
          />
          {importStatus && <p className="status-message">{importStatus}</p>}
        </div>
        
        <div className="export-section">
          <button className="btn-secondary" onClick={handleExport}>
            Export Data
          </button>
          {exportStatus && <p className="status-message">{exportStatus}</p>}
        </div>
        
        <div className="clear-section">
          <button className="btn-danger" onClick={handleClear}>
            Reset All Data
          </button>
          <p className="warning-text">Warning: This will delete all your bookmarks and settings!</p>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;