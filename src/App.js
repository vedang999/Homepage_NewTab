// App.jsx - Main component with TodoList instead of tabs
import React, { useState, useEffect } from 'react';
import LinkGrid from './components/LinkGrid';
import AddLinkForm from './components/AddLinkForm';
import TodoList from './components/TodoList';
import Clock from './components/Clock';
import SearchBar from './components/SearchBar';
import Settings from './components/Settings';
import AppsDrawer from './components/AppsDrawer';
import './App.css';


function App() {
  // useEffect(() => {
  //   console.log("Clearing localStorage and resetting to defaults");
  //   localStorage.removeItem('newTabSettings');
  // }, []);
  // State for links and settings
  const [links, setLinks] = useState([]);
// In App.js, modify your settings state declaration:
const [settings, setSettings] = useState({
  theme: 'auto',
  background: 'image',
  backgroundColor: '#3498db',
  backgroundImage: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f',
  showClock: true,
  showSearch: true,
  columns: 8,
  showTodoList: true,
  showAppsDrawer: true,
  apps: [
    { id: "1", name: "Gmail", url: "https://mail.google.com", icon: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" },
    { id: "2", name: "Drive", url: "https://drive.google.com", icon: "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" },
    { id: "3", name: "Calendar", url: "https://calendar.google.com", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" },
    { id: "4", name: "YouTube", url: "https://youtube.com", icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" },
    { id: "5", name: "Maps", url: "https://maps.google.com", icon: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" },
    // { id: "6", name: "Photos", url: "https://photos.google.com", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Google_Photos_icon_%282022%29.svg/640px-Google_Photos_icon_%282022%29.svg.png" }
  ]
});
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [todos, setTodos] = useState([]);
  // In your useEffect for loading data
useEffect(() => {
  try {
    // Load todos
    const storedTodos = localStorage.getItem('newTabTodos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
      console.log('Loaded todos:', JSON.parse(storedTodos).length);
    }
    
    // Load links
    const storedLinks = localStorage.getItem('newTabLinks');
    if (storedLinks) {
      const parsedLinks = JSON.parse(storedLinks);
      setLinks(parsedLinks);
      console.log('Loaded links:', parsedLinks.length);
    }
     // Load settings - but ensure apps are preserved
     const storedSettings = localStorage.getItem('newTabSettings');
     if (storedSettings) {
       const parsedSettings = JSON.parse(storedSettings);
       
       // Create new settings object that preserves the apps array
       const defaultApps = [
         { id: "1", name: "Gmail", url: "https://mail.google.com", icon: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" },
         { id: "2", name: "Drive", url: "https://drive.google.com", icon: "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" },
         { id: "3", name: "Calendar", url: "https://calendar.google.com", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" },
         { id: "4", name: "YouTube", url: "https://youtube.com", icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" },
         { id: "5", name: "Maps", url: "https://maps.google.com", icon: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" },
        //  { id: "6", name: "Photos", url: "https://photos.google.com", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Google_Photos_icon_%282022%29.svg/640px-Google_Photos_icon_%282022%29.svg.png" }
        ];
       
       const mergedSettings = {
         ...parsedSettings,
         // Use stored apps if they exist, otherwise use the default apps
         apps: parsedSettings.apps || defaultApps
       };
       
       setSettings(mergedSettings);
     }
     
     setIsDataLoaded(true);
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    // If there's an error, use default values
    setIsDataLoaded(true);
  }
}, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    // Only save after initial data is loaded to prevent overwriting with empty state
    if (!isDataLoaded) return;
    
    try {
      localStorage.setItem('newTabTodos', JSON.stringify(todos));
      console.log('Saved todos:', todos.length);
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos, isDataLoaded]);

  // Save links and settings to localStorage whenever they change
  useEffect(() => {
    // Only save after initial data is loaded to prevent overwriting with empty state
    if (!isDataLoaded) return;
    
    try {
      console.log('Saving links:', links.length);
      localStorage.setItem('newTabLinks', JSON.stringify(links));
      localStorage.setItem('newTabSettings', JSON.stringify(settings));
      
      // Verify data was saved correctly
      const savedLinks = localStorage.getItem('newTabLinks');
      if (savedLinks) {
        const parsedLinks = JSON.parse(savedLinks);
        console.log('Verified saved links:', parsedLinks.length);
      }
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [links, settings, isDataLoaded]);

  // Add new link
  const addLink = (link) => {
    const newLink = {
      ...link,
      id: Date.now().toString(),
    };
    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    // Force save immediately
    localStorage.setItem('newTabLinks', JSON.stringify(updatedLinks));
    setShowAddForm(false);
  };

  // Remove link
  const removeLink = (id) => {
    const updatedLinks = links.filter(link => link.id !== id);
    setLinks(updatedLinks);
    // Force save immediately
    localStorage.setItem('newTabLinks', JSON.stringify(updatedLinks));
  };

  // Update settings
  const updateSettings = (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    // Force save immediately
    localStorage.setItem('newTabSettings', JSON.stringify(updatedSettings));
    setShowSettings(false);
  };

  // Determine background style based on settings
  const getBackgroundStyle = () => {
    if (settings.background === 'gradient') {
      return {
        background: `linear-gradient(135deg, ${settings.backgroundColor}, #8e44ad)`,
      };
    } else if (settings.background === 'image' && settings.backgroundImage) {
      return {
        backgroundImage: `url(${settings.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    } else {
      return {
        backgroundColor: settings.backgroundColor,
      };
    }
  };
console.log('Apps data:', settings.apps);
console.log('Show apps drawer:', settings.showAppsDrawer);
  return (
    <div className={`app ${settings.theme}`} style={getBackgroundStyle()}>
      <div className="app-container">
        <header>
          {settings.showClock && <Clock />}
          {settings.showSearch && <SearchBar />}
          <div className="header-buttons">
            <button className="icon-button" onClick={() => setShowAddForm(true)}>
              <span className="material-icons">add</span>
            </button>
            {/* {settings.showAppsDrawer && <AppsDrawer apps={settings.apps} />} */}
            {settings.showAppsDrawer && <AppsDrawer apps={settings.apps} />}
            <button className="icon-button" onClick={() => setShowSettings(true)}>
              <span className="material-icons">settings</span>
            </button>
          </div>
        </header>

        <main>
          <div className="dashboard-layout">
            <LinkGrid 
              links={links} 
              removeLink={removeLink}
              columns={settings.columns}
            />
            {settings.showTodoList && <TodoList todos={todos} setTodos={setTodos} />}
          </div>
        </main>
          {showAddForm && (
              <div className="modal" onClick={(e) => {
                // Only close if the click is directly on the modal backdrop
                if (e.target.className === 'modal') {
                  setShowAddForm(false);
                }
              }}>
                <AddLinkForm 
                  addLink={addLink} 
                  onCancel={() => setShowAddForm(false)} 
                />
              </div>
            )}

          {showSettings && (
            <div className="modal" onClick={(e) => {
              // Only close if the click is directly on the modal backdrop
              if (e.target.className === 'modal') {
                setShowSettings(false);
              }
            }}>
              <Settings 
                settings={settings} 
                updateSettings={updateSettings} 
                onCancel={() => setShowSettings(false)} 
              />
            </div>
          )}
      </div>
    </div>
  );
}

export default App;