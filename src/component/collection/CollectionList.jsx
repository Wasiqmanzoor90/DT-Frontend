import { Clock, Folder } from "lucide-react";
import { useState } from "react";
import { CollectionList } from "../ResponseBuilder/ResponseBuilder";
import { RequestBuilder } from "../RequestBuilder/RequestBuilder";

import { ResponseViewer } from "../ResponseBuilder/ResponseBuilder";



export default function APIClient() {
  const [activeTab, setActiveTab] = useState('collections');

  return (
    <div className="h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">API Client</h1>
        </div>
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
          {activeTab === 'collections' ? (
            <CollectionList />
          ) : (
            <div className="p-4 text-gray-500 text-sm text-center">
              History feature coming soon
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <RequestBuilder />
          <ResponseViewer />
        </div>
      </main>
    </div>
  );
}