import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from "../../assets/images/logo.svg"
import { Link } from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate();
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyTab, setNotifyTab] = useState<'all' | 'unread'>('all');
  const [user, setUser] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleStorageChange = () => {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('darkModeChange', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('darkModeChange', handleStorageChange);
    };
  }, []);

  // Logout handler
  const handleLogout = () => {
    // Clear user data from localStorage/sessionStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    // Close the profile dropdown
    setProfileOpen(false);
    
    // Redirect to login page
    navigate('/login');
  };



  const notifications = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      text: 'posted a link in your timeline.',
      name: 'Steve Jobs',
      time: '42 minutes ago'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      text: 'changed the name of the group',
      name: 'Freelancer usa',
      time: '42 minutes ago'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      text: 'posted a link in your timeline.',
      name: 'Steve Jobs',
      time: '42 minutes ago'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      text: 'changed the name of the group',
      name: 'Freelancer usa',
      time: '42 minutes ago'
    },
  ];

  return (
    <>
      <nav className={`${darkMode ? "bg-[#112032]" : "bg-white"} h-18 border-b ${darkMode ? "border-gray-700" : "border-gray-200"} px-4 py-2 fixed top-0 left-0 right-0 z-50`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="h-8" />
            </div>
          </Link>

          {/* Search Bar */}
          <div className='mt-4 w-[400px]'>
            <form className="_feed_right_inner_area_card_form">
              <svg className="_feed_right_inner_area_card_form_svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
                <circle cx="7" cy="7" r="6" stroke="#666"></circle>
                <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3"></path>
              </svg>
              <input className="form-control me-2 _feed_right_inner_area_card_form_inpt" type="search" placeholder="input search text" aria-label="Search" />
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 ml-0 w-[450px]">
            {/* Home Icon */}
            <Link to="#" className={`flex items-center justify-center w-10 h-10 rounded-lg ${darkMode ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50" : "bg-blue-50 text-blue-600 hover:bg-blue-100"} transition-colors`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" fill="none" viewBox="0 0 18 21">
                <path className="_home_active" stroke={darkMode ? "#60a5fa" : "#000"} strokeWidth="1.5" strokeOpacity={darkMode ? "1" : ".6"} d="M1 9.924c0-1.552 0-2.328.314-3.01.313-.682.902-1.187 2.08-2.196l1.143-.98C6.667 1.913 7.732 1 9 1c1.268 0 2.333.913 4.463 2.738l1.142.98c1.179 1.01 1.768 1.514 2.081 2.196.314.682.314 1.458.314 3.01v4.846c0 2.155 0 3.233-.67 3.902-.669.67-1.746.67-3.901.67H5.57c-2.155 0-3.232 0-3.902-.67C1 18.002 1 16.925 1 14.77V9.924z" />
                <path className="_home_active" stroke={darkMode ? "#60a5fa" : "#000"} strokeOpacity={darkMode ? "1" : ".6"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.857 19.341v-5.857a1 1 0 00-1-1H7.143a1 1 0 00-1 1v5.857" />
              </svg>
            </Link>

            {/* Users Icon */}
            <Link to="#" className={`flex items-center justify-center w-10 h-10 rounded-lg ${darkMode ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"} transition-colors`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" fill="none" viewBox="0 0 26 20">
                <path fill={darkMode ? "#9ca3af" : "#000"} fillOpacity={darkMode ? "1" : ".6"} fillRule="evenodd" d="M12.79 12.15h.429c2.268.015 7.45.243 7.45 3.732 0 3.466-5.002 3.692-7.415 3.707h-.894c-2.268-.015-7.452-.243-7.452-3.727 0-3.47 5.184-3.697 7.452-3.711l.297-.001h.132zm0 1.75c-2.792 0-6.12.34-6.12 1.962 0 1.585 3.13 1.955 5.864 1.976l.255.002c2.792 0 6.118-.34 6.118-1.958 0-1.638-3.326-1.982-6.118-1.982zm9.343-2.224c2.846.424 3.444 1.751 3.444 2.79 0 .636-.251 1.794-1.931 2.43a.882.882 0 01-1.137-.506.873.873 0 01.51-1.13c.796-.3.796-.633.796-.793 0-.511-.654-.868-1.944-1.06a.878.878 0 01-.741-.996.886.886 0 011.003-.735zm-17.685.735a.878.878 0 01-.742.997c-1.29.19-1.944.548-1.944 1.059 0 .16 0 .491.798.793a.873.873 0 01-.314 1.693.897.897 0 01-.313-.057C.25 16.259 0 15.1 0 14.466c0-1.037.598-2.366 3.446-2.79.485-.06.929.257 1.002.735zM12.789 0c2.96 0 5.368 2.392 5.368 5.33 0 2.94-2.407 5.331-5.368 5.331h-.031a5.329 5.329 0 01-3.782-1.57 5.253 5.253 0 01-1.553-3.764C7.423 2.392 9.83 0 12.789 0zm0 1.75c-1.987 0-3.604 1.607-3.604 3.58a3.526 3.526 0 001.04 2.527 3.58 3.58 0 002.535 1.054l.03.875v-.875c1.987 0 3.605-1.605 3.605-3.58S14.777 1.75 12.789 1.75zm7.27-.607a4.222 4.222 0 013.566 4.172c-.004 2.094-1.58 3.89-3.665 4.181a.88.88 0 01-.994-.745.875.875 0 01.75-.989 2.494 2.494 0 002.147-2.45 2.473 2.473 0 00-2.09-2.443.876.876 0 01-.726-1.005.881.881 0 011.013-.721zm-13.528.72a.876.876 0 01-.726 1.006 2.474 2.474 0 00-2.09 2.446A2.493 2.493 0 005.86 7.762a.875.875 0 11-.243 1.734c-2.085-.29-3.66-2.087-3.664-4.179 0-2.082 1.5-3.837 3.566-4.174a.876.876 0 011.012.72z" clipRule="evenodd" />
              </svg>
            </Link>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifyOpen(!notifyOpen)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-lg ${darkMode ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"} transition-colors`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22">
                  <path fill={darkMode ? "#9ca3af" : "#000"} fillOpacity={darkMode ? "1" : ".6"} fillRule="evenodd" d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z" clipRule="evenodd" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  6
                </span>
              </button>

              {/* Notifications Dropdown */}
              {notifyOpen && (
                <div className={`absolute right-0 top-full mt-1 w-80 ${darkMode ? "bg-[#0f1c35]" : "bg-white"} rounded-lg shadow-lg border ${darkMode ? "border-gray-700" : "border-gray-200"} z-50`}>
                  {/* Header */}
                  <div className={`flex items-center justify-between px-5 py-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <h4 className={`text-base font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>Notifications</h4>
                    <button className={`p-1 ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} rounded`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="4" fill="none" viewBox="0 0 16 4">
                        <circle cx="2" cy="2" r="2" fill={darkMode ? "#9ca3af" : "#666"} />
                        <circle cx="8" cy="2" r="2" fill={darkMode ? "#9ca3af" : "#666"} />
                        <circle cx="14" cy="2" r="2" fill={darkMode ? "#9ca3af" : "#666"} />
                      </svg>
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className={`flex gap-2 px-5 py-3 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <button
                      onClick={() => setNotifyTab('all')}
                      className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                        notifyTab === 'all' 
                          ? 'bg-blue-500 text-white' 
                          : darkMode 
                            ? 'text-gray-400 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setNotifyTab('unread')}
                      className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                        notifyTab === 'unread' 
                          ? 'bg-blue-500 text-white' 
                          : darkMode 
                            ? 'text-gray-400 hover:bg-gray-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Unread
                    </button>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`flex gap-3 px-5 py-4 ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"} cursor-pointer border-b ${darkMode ? "border-gray-700/50" : "border-gray-100"} last:border-0`}
                      >
                        <img
                          src={notif.image}
                          alt={notif.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            <span className="font-semibold text-blue-500">{notif.name}</span> {notif.text}
                          </p>
                          <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"} mt-1 inline-block`}>{notif.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <Link to="#" className={`relative flex items-center justify-center w-10 h-10 rounded-lg ${darkMode ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"} transition-colors`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" fill="none" viewBox="0 0 23 22">
                <path fill={darkMode ? "#9ca3af" : "#000"} fillOpacity={darkMode ? "1" : ".6"} fillRule="evenodd" d="M11.43 0c2.96 0 5.743 1.143 7.833 3.22 4.32 4.29 4.32 11.271 0 15.562C17.145 20.886 14.293 22 11.405 22c-1.575 0-3.16-.33-4.643-1.012-.437-.174-.847-.338-1.14-.338-.338.002-.793.158-1.232.308-.9.307-2.022.69-2.852-.131-.826-.822-.445-1.932-.138-2.826.152-.44.307-.895.307-1.239 0-.282-.137-.642-.347-1.161C-.57 11.46.322 6.47 3.596 3.22A11.04 11.04 0 0111.43 0zm0 1.535A9.5 9.5 0 004.69 4.307a9.463 9.463 0 00-1.91 10.686c.241.592.474 1.17.474 1.77 0 .598-.207 1.201-.39 1.733-.15.439-.378 1.1-.231 1.245.143.147.813-.085 1.255-.235.53-.18 1.133-.387 1.73-.391.597 0 1.161.225 1.758.463 3.655 1.679 7.98.915 10.796-1.881 3.716-3.693 3.716-9.7 0-13.391a9.5 9.5 0 00-6.74-2.77zm4.068 8.867c.57 0 1.03.458 1.03 1.024 0 .566-.46 1.023-1.03 1.023a1.023 1.023 0 11-.01-2.047h.01zm-4.131 0c.568 0 1.03.458 1.03 1.024 0 .566-.462 1.023-1.03 1.023a1.03 1.03 0 01-1.035-1.024c0-.566.455-1.023 1.025-1.023h.01zm-4.132 0c.568 0 1.03.458 1.03 1.024 0 .566-.462 1.023-1.03 1.023a1.022 1.022 0 11-.01-2.047h.01z" clipRule="evenodd" />
              </svg> 
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                2
              </span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative ml-2">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-2 ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"} rounded-lg px-2 py-1.5 transition-colors`}
              >
                <img
                  src={user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"}
                  alt={user?.firstName || "User"}
                  className="w-7 h-7 rounded-full object-cover border border-gray-300"
                />
                <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} hidden sm:block`}>{user?.firstName || "User"}</span>
                <svg className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"} hidden sm:block`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {profileOpen && (
                <div className={`absolute right-0 top-full mt-2 w-64 ${darkMode ? "bg-[#0f1c35]" : "bg-white"} rounded-xl shadow-xl border ${darkMode ? "border-gray-700" : "border-gray-200"} z-50 overflow-hidden`}>
                  {/* Profile Info */}
                  <div className={`${darkMode ? "bg-gradient-to-r from-gray-800 to-gray-700" : "bg-gradient-to-r from-blue-50 to-blue-100"} px-4 py-4 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <div className="flex items-center gap-3">
                      <img
                        src={user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"}
                        alt={user?.firstName || "User"}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <div className="flex-1">
                        <h4 className={`text-sm font-bold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>{user?.firstName} {user?.lastName}</h4>
                        <Link to="/my-profile" className={`text-xs ${darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"} font-medium transition-colors`}>
                          View Profile →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {/* Settings */}
                    <Link
                      to="/settings"
                      className={`flex items-center justify-between px-4 py-3 ${darkMode ? "hover:bg-gray-800" : "hover:bg-blue-50"} transition-all duration-200 group border-l-4 border-transparent hover:border-blue-500`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className={`w-5 h-5 ${darkMode ? "text-gray-400 group-hover:text-blue-400" : "text-gray-600 group-hover:text-blue-600"} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className={`text-sm font-medium ${darkMode ? "text-gray-300 group-hover:text-gray-200" : "text-gray-700 group-hover:text-gray-900"} transition-colors`}>Settings</span>
                      </div>
                      <svg className={`w-4 h-4 ${darkMode ? "text-gray-500 group-hover:text-blue-400" : "text-gray-400 group-hover:text-blue-500"} transition-colors transform group-hover:translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    {/* Help & Support */}
                    <Link
                      to="/help"
                      className={`flex items-center justify-between px-4 py-3 ${darkMode ? "hover:bg-gray-800" : "hover:bg-blue-50"} transition-all duration-200 group border-l-4 border-transparent hover:border-blue-500`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className={`w-5 h-5 ${darkMode ? "text-gray-400 group-hover:text-blue-400" : "text-gray-600 group-hover:text-blue-600"} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className={`text-sm font-medium ${darkMode ? "text-gray-300 group-hover:text-gray-200" : "text-gray-700 group-hover:text-gray-900"} transition-colors`}>Help & Support</span>
                      </div>
                      <svg className={`w-4 h-4 ${darkMode ? "text-gray-500 group-hover:text-blue-400" : "text-gray-400 group-hover:text-blue-500"} transition-colors transform group-hover:translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    {/* Divider */}
                    <div className={`my-1 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`} />
                    
                    {/* Log Out */}
                    <button
                      onClick={handleLogout}
                      className={`w-full flex items-center justify-between px-4 py-3 ${darkMode ? "hover:bg-red-900/20" : "hover:bg-red-50"} transition-all duration-200 group border-l-4 border-transparent hover:border-red-500`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className={`w-5 h-5 ${darkMode ? "text-gray-400 group-hover:text-red-400" : "text-gray-600 group-hover:text-red-600"} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className={`text-sm font-medium ${darkMode ? "text-gray-300 group-hover:text-red-400" : "text-gray-700 group-hover:text-red-600"} transition-colors`}>Log Out</span>
                      </div>
                      <svg className={`w-4 h-4 ${darkMode ? "text-gray-500 group-hover:text-red-400" : "text-gray-400 group-hover:text-red-500"} transition-colors transform group-hover:translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
			<div className="_header_mobile_menu">
				<div className="_header_mobile_menu_wrap">
					<div className="container">
						<div  className="_header_mobile_menu">
							<div className="row">
								<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
									<div className="_header_mobile_menu_top_inner">
										<div className="_header_mobile_menu_logo">
											<Link to="/" className="_mobile_logo_link">
												<img src={Logo} alt="Image" className="_nav_logo" />
											</Link>
										</div>
										<div className="_header_mobile_menu_right">
											<form className="_header_form_grp">
												<Link to="/" className="_header_mobile_search"> 
													<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
														<circle cx="7" cy="7" r="6" stroke="#666"/>
														<path stroke="#666" strokeLinecap="round" d="M16 16l-3-3"/>
													</svg>													  
												</Link>
											</form>
										</div>
									</div>
								</div>
							</div> 
						</div>
					</div>
				</div>
			</div>
			<div className="_mobile_navigation_bottom_wrapper">
				<div className="_mobile_navigation_bottom_wrap">
					<div className="conatiner">
						<div className="row">
							<div className="col-xl-12 col-lg-12 col-md-12">
								<ul className="_mobile_navigation_bottom_list">
									<li className="_mobile_navigation_bottom_item">
										<a href="feed.html" className="_mobile_navigation_bottom_link _mobile_navigation_bottom_link_active">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="27" fill="none" viewBox="0 0 24 27">
												<path className="_mobile_svg" fill="#000" fillOpacity=".6" stroke="#666666" strokeWidth="1.5" d="M1 13.042c0-2.094 0-3.141.431-4.061.432-.92 1.242-1.602 2.862-2.965l1.571-1.321C8.792 2.232 10.256 1 12 1c1.744 0 3.208 1.232 6.136 3.695l1.572 1.321c1.62 1.363 2.43 2.044 2.86 2.965.432.92.432 1.967.432 4.06v6.54c0 2.908 0 4.362-.92 5.265-.921.904-2.403.904-5.366.904H7.286c-2.963 0-4.445 0-5.365-.904C1 23.944 1 22.49 1 19.581v-6.54z"/>
												<path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.07 18.497h5.857v7.253H9.07v-7.253z"/>
											</svg>																						
										</a>
									</li>
									<li className="_mobile_navigation_bottom_item">
										<a href="friend-request.html" className="_mobile_navigation_bottom_link">
											<svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" fill="none" viewBox="0 0 27 20">
												<path className="_dark_svg" fill="#000" fillOpacity=".6" fillRule="evenodd" d="M13.334 12.405h.138l.31.001c2.364.015 7.768.247 7.768 3.81 0 3.538-5.215 3.769-7.732 3.784h-.932c-2.364-.015-7.77-.247-7.77-3.805 0-3.543 5.405-3.774 7.77-3.789l.31-.001h.138zm0 1.787c-2.91 0-6.38.348-6.38 2.003 0 1.619 3.263 1.997 6.114 2.018l.266.001c2.91 0 6.379-.346 6.379-1.998 0-1.673-3.469-2.024-6.38-2.024zm9.742-2.27c2.967.432 3.59 1.787 3.59 2.849 0 .648-.261 1.83-2.013 2.48a.953.953 0 01-.327.058.919.919 0 01-.858-.575.886.886 0 01.531-1.153c.83-.307.83-.647.83-.81 0-.522-.682-.886-2.027-1.082a.9.9 0 01-.772-1.017c.074-.488.54-.814 1.046-.75zm-18.439.75a.9.9 0 01-.773 1.017c-1.345.196-2.027.56-2.027 1.082 0 .163 0 .501.832.81a.886.886 0 01.531 1.153.92.92 0 01-.858.575.953.953 0 01-.327-.058C.262 16.6 0 15.418 0 14.77c0-1.06.623-2.417 3.592-2.85.506-.061.97.263 1.045.751zM13.334 0c3.086 0 5.596 2.442 5.596 5.442 0 3.001-2.51 5.443-5.596 5.443H13.3a5.616 5.616 0 01-3.943-1.603A5.308 5.308 0 017.74 5.439C7.739 2.442 10.249 0 13.334 0zm0 1.787c-2.072 0-3.758 1.64-3.758 3.655-.003.977.381 1.89 1.085 2.58a3.772 3.772 0 002.642 1.076l.03.894v-.894c2.073 0 3.76-1.639 3.76-3.656 0-2.015-1.687-3.655-3.76-3.655zm7.58-.62c2.153.344 3.717 2.136 3.717 4.26-.004 2.138-1.647 3.972-3.82 4.269a.911.911 0 01-1.036-.761.897.897 0 01.782-1.01c1.273-.173 2.235-1.248 2.237-2.501 0-1.242-.916-2.293-2.179-2.494a.897.897 0 01-.756-1.027.917.917 0 011.055-.736zM6.81 1.903a.897.897 0 01-.757 1.027C4.79 3.13 3.874 4.182 3.874 5.426c.002 1.251.963 2.327 2.236 2.5.503.067.853.519.783 1.008a.912.912 0 01-1.036.762c-2.175-.297-3.816-2.131-3.82-4.267 0-2.126 1.563-3.918 3.717-4.262.515-.079.972.251 1.055.736z" clipRule="evenodd"/>
											</svg>											  
										</a>
									</li>
									<li className="_mobile_navigation_bottom_item">
										<a href="no" className="_mobile_navigation_bottom_link">
											<svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" fill="none" viewBox="0 0 25 27">
												<path className="_dark_svg" fill="#000" fillOpacity=".6" fillRule="evenodd" d="M10.17 23.46c.671.709 1.534 1.098 2.43 1.098.9 0 1.767-.39 2.44-1.099.36-.377.976-.407 1.374-.067.4.34.432.923.073 1.3-1.049 1.101-2.428 1.708-3.886 1.708h-.003c-1.454-.001-2.831-.608-3.875-1.71a.885.885 0 01.072-1.298 1.01 1.01 0 011.374.068zM12.663 0c5.768 0 9.642 4.251 9.642 8.22 0 2.043.549 2.909 1.131 3.827.576.906 1.229 1.935 1.229 3.88-.453 4.97-5.935 5.375-12.002 5.375-6.067 0-11.55-.405-11.998-5.296-.004-2.024.649-3.053 1.225-3.959l.203-.324c.501-.814.928-1.7.928-3.502C3.022 4.25 6.897 0 12.664 0zm0 1.842C8.13 1.842 4.97 5.204 4.97 8.22c0 2.553-.75 3.733-1.41 4.774-.531.836-.95 1.497-.95 2.932.216 2.316 1.831 3.533 10.055 3.533 8.178 0 9.844-1.271 10.06-3.613-.004-1.355-.423-2.016-.954-2.852-.662-1.041-1.41-2.221-1.41-4.774 0-3.017-3.161-6.38-7.696-6.38z" clipRule="evenodd"/>
											</svg>		
											<span className="_counting">6</span>									  
										</a>
									</li>
									<li className="_mobile_navigation_bottom_item">
										<a href="chat_list(for_mbl).html" className="_mobile_navigation_bottom_link">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
												<path className="_dark_svg" fill="#000" fillOpacity=".6" fillRule="evenodd" d="M12.002 0c3.208 0 6.223 1.239 8.487 3.489 4.681 4.648 4.681 12.211 0 16.86-2.294 2.28-5.384 3.486-8.514 3.486-1.706 0-3.423-.358-5.03-1.097-.474-.188-.917-.366-1.235-.366-.366.003-.859.171-1.335.334-.976.333-2.19.748-3.09-.142-.895-.89-.482-2.093-.149-3.061.164-.477.333-.97.333-1.342 0-.306-.149-.697-.376-1.259C-1 12.417-.032 7.011 3.516 3.49A11.96 11.96 0 0112.002 0zm.001 1.663a10.293 10.293 0 00-7.304 3.003A10.253 10.253 0 002.63 16.244c.261.642.514 1.267.514 1.917 0 .649-.225 1.302-.422 1.878-.163.475-.41 1.191-.252 1.349.156.16.881-.092 1.36-.255.576-.195 1.228-.42 1.874-.424.648 0 1.259.244 1.905.503 3.96 1.818 8.645.99 11.697-2.039 4.026-4 4.026-10.509 0-14.508a10.294 10.294 0 00-7.303-3.002zm4.407 9.607c.617 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.12-1.11c0-.613.494-1.108 1.11-1.108h.01zm-4.476 0c.616 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.121-1.11c0-.613.493-1.108 1.11-1.108h.01zm-4.477 0c.617 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.12-1.11c0-.613.494-1.108 1.11-1.108h.01z" clipRule="evenodd"/>
											</svg>			
											<span className="_counting">2</span>								  
										</a>
									</li>
									<div className="_header_mobile_toggle">
										<form action="/mobileMenu.html">
											<button type="submit" className="_header_mobile_btn_link" value="go to mobile menu">
												<svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" fill="none" viewBox="0 0 18 14">
													<path stroke="#666" strokeLinecap="round" strokeWidth="1.5" d="M1 1h16M1 7h16M1 13h16"/>
												</svg>													  
											</button>
										</form>
									</div>
									<li className="_mobile_navigation_bottom_item">
										<a href="profile.html" className="_mobile_navigation_bottom_link">
											<svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" fill="none" viewBox="0 0 29 28">
												<g opacity=".6">
												  <path className="_mobile_svg1 _dark_svg" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M23.999 24.5v-2.333a4.667 4.667 0 00-4.667-4.667H9.999a4.667 4.667 0 00-4.667 4.667V24.5M14.667 12.833a4.667 4.667 0 100-9.333 4.667 4.667 0 000 9.333z"/>
												</g>
											</svg>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
    </>
  )
}

export default Navbar