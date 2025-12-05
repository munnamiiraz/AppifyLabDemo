
interface ThreeDotsMenuProps {
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
  show: boolean;
  onClose: () => void;
}

const ThreeDotsMenu = ({ isAuthor, onEdit, onDelete, show }: ThreeDotsMenuProps) => {
  console.log('ThreeDotsMenu rendered:', { isAuthor, show });
  
  if (!show) return null;

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full right-0 mt-1 w-56 bg-white border-2 border-black rounded-lg shadow-xl z-[99999]"
    >
      <ul className="py-1 list-none m-0 p-0">
        {isAuthor ? (
          <>
            <li>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Edit clicked');
                  onEdit();
                }}
                className="w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708L10.5 8.207l-3-3L12.146.146zM11.207 9L8 5.793 1.146 12.646a.5.5 0 0 0-.146.354v2.5a.5.5 0 0 0 .5.5h2.5a.5.5 0 0 0 .354-.146L11.207 9z"/>
                </svg>
                <span>Edit Post</span>
              </button>
            </li>
            <li className="border-t border-gray-200">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Delete clicked');
                  onDelete();
                }}
                className="w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                <span>Delete Post</span>
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <a 
                href="#0" 
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors no-underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
                <span>Save Post</span>
              </a>
            </li>
            <li className="border-t border-gray-200">
              <a 
                href="#0" 
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors no-underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <span>Turn On Notification</span>
              </a>
            </li>
            <li className="border-t border-gray-200">
              <a 
                href="#0" 
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors no-underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                </svg>
                <span>Hide</span>
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default ThreeDotsMenu;
