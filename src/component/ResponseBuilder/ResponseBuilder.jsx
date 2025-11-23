import { useState } from "react";
import { useCollectionStore } from "../../store/CollectionStore";
import { useRequestStore } from "../../store/RequestStore";

// ResponseViewer Component
export function ResponseViewer() {
  const { response } = useRequestStore();

  if (!response) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        Send a request to see the response here
      </div>
    );
  }

  if (response.error) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <h3 className="font-medium text-red-800 mb-2">Error</h3>
          <p className="text-red-600">{response.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <span className={`font-medium ${response.status < 300 ? 'text-green-600' : 'text-red-600'}`}>
            {response.status} {response.statusText}
          </span>
          <span className="text-gray-600 text-sm">{response.duration}ms</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium mb-2">Response Body</h3>
        <pre className="bg-gray-50 p-4 rounded overflow-auto max-h-96 text-sm">
          {typeof response.data === 'object'
            ? JSON.stringify(response.data, null, 2)
            : response.data}
        </pre>
      </div>
    </div>
  );
}

// CollectionList Component
 export function CollectionList() {
  const { collections, setCollection } = useCollectionStore();
  const { setMethod, setUrl } = useRequestStore();
  const [expandedCollections, setExpandedCollections] = useState(['1']);

  const toggleCollection = (id) => {
    setExpandedCollections(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const loadRequest = (req) => {
    setMethod(req.method);
    setUrl(req.url);
  };

  return (
    <div className="p-2">
      {collections.length === 0 ? (
        <p className="text-gray-500 text-sm p-4 text-center">No collections yet</p>
      ) : (
        <div className="space-y-1">
          {collections.map(col => (
            <div key={col.id}>
              <button
                onClick={() => toggleCollection(col.id)}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-left"
              >
                <ChevronRight
                  size={16}
                  className={`transition-transform ${
                    expandedCollections.includes(col.id) ? 'rotate-90' : ''
                  }`}
                />
                <Folder size={16} className="text-blue-600" />
                <span className="font-medium">{col.name}</span>
              </button>
              {expandedCollections.includes(col.id) && (
                <div className="ml-6 space-y-1">
                  {col.requests.map(req => (
                    <button
                      key={req.id}
                      onClick={() => loadRequest(req)}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-left text-sm"
                    >
                      <span className={`font-medium px-2 py-0.5 rounded text-xs ${
                        req.method === 'GET' ? 'bg-green-100 text-green-700' :
                        req.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                        req.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                        req.method === 'DELETE' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {req.method}
                      </span>
                      <span className="truncate">{req.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

