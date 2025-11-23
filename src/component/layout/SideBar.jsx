import { useState } from 'react';
import { Folder, Clock } from 'lucide-react';
import CollectionList from '../collection/CollectionList'


export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('collections');

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('collections')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'collections'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Folder size={16} className="inline mr-2" />
          Collections
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 px-4 py-3 text-sm font-medium ${
            activeTab === 'history'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Clock size={16} className="inline mr-2" />
          History
        </button>
      </div>
      <div className="overflow-auto h-[calc(100vh-120px)]">
        {activeTab === 'collections' ? <CollectionList /> : <HistoryList />}
      </div>
    </aside>
  );
}