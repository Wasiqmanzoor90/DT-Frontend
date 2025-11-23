import { useState } from "react";
import { useRequestStore } from "../../store/RequestStore";
import { Plus, Send, X } from "lucide-react";

export function RequestBuilder() {
  const { currentRequest, setMethod, setUrl, setHeaders, setQueryParams, setBody, setBodyType, isLoading, setLoading, setResponse } = useRequestStore();
  const [activeTab, setActiveTab] = useState('params');

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  const handleAddParam = () => {
    setQueryParams([...currentRequest.queryParams, { key: '', value: '', enabled: true }]);
  };

  const handleUpdateParam = (idx, field, val) => {
    const updated = [...currentRequest.queryParams];
    updated[idx][field] = val;
    setQueryParams(updated);
  };

  const handleRemoveParam = (idx) => {
    setQueryParams(currentRequest.queryParams.filter((_, i) => i !== idx));
  };

  const handleAddHeader = () => {
    setHeaders([...currentRequest.headers, { key: '', value: '', enabled: true }]);
  };

  const handleUpdateHeader = (idx, field, val) => {
    const updated = [...currentRequest.headers];
    updated[idx][field] = val;
    setHeaders(updated);
  };

  const handleRemoveHeader = (idx) => {
    setHeaders(currentRequest.headers.filter((_, i) => i !== idx));
  };

  const handleSendRequest = async () => {
    setLoading(true);
    try {
      const url = new URL(currentRequest.url);
      currentRequest.queryParams
        .filter(p => p.enabled && p.key)
        .forEach(p => url.searchParams.append(p.key, p.value));

      const headers = {};
      currentRequest.headers
        .filter(h => h.enabled && h.key)
        .forEach(h => headers[h.key] = h.value);

      const options = {
        method: currentRequest.method,
        headers,
      };

      if (currentRequest.method !== 'GET' && currentRequest.bodyType !== 'none') {
        options.body = currentRequest.body;
      }

      const start = Date.now();
      const res = await fetch(url.toString(), options);
      const duration = Date.now() - start;
      const data = await res.text();
      
      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch {
        parsedData = data;
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data: parsedData,
        duration,
      });
    } catch (err) {
      setResponse({
        error: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex gap-2">
          <select
            value={currentRequest.method}
            onChange={(e) => setMethod(e.target.value)}
            className="px-3 py-2 border rounded bg-white font-medium"
          >
            {methods.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            type="text"
            value={currentRequest.url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter request URL"
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={handleSendRequest}
            disabled={isLoading || !currentRequest.url}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send size={16} />
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>

      <div className="border-b">
        <div className="flex">
          {['params', 'headers', 'body'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'params' && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Query Parameters</h3>
              <button
                onClick={handleAddParam}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
              >
                <Plus size={16} /> Add Parameter
              </button>
            </div>
            {currentRequest.queryParams.length === 0 ? (
              <p className="text-gray-500 text-sm">No parameters added</p>
            ) : (
              <div className="space-y-2">
                {currentRequest.queryParams.map((p, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={p.enabled}
                      onChange={(e) => handleUpdateParam(i, 'enabled', e.target.checked)}
                    />
                    <input
                      type="text"
                      value={p.key}
                      onChange={(e) => handleUpdateParam(i, 'key', e.target.value)}
                      placeholder="Key"
                      className="flex-1 px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      value={p.value}
                      onChange={(e) => handleUpdateParam(i, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1 px-3 py-2 border rounded"
                    />
                    <button
                      onClick={() => handleRemoveParam(i)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'headers' && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Headers</h3>
              <button
                onClick={handleAddHeader}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
              >
                <Plus size={16} /> Add Header
              </button>
            </div>
            {currentRequest.headers.length === 0 ? (
              <p className="text-gray-500 text-sm">No headers added</p>
            ) : (
              <div className="space-y-2">
                {currentRequest.headers.map((h, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={h.enabled}
                      onChange={(e) => handleUpdateHeader(i, 'enabled', e.target.checked)}
                    />
                    <input
                      type="text"
                      value={h.key}
                      onChange={(e) => handleUpdateHeader(i, 'key', e.target.value)}
                      placeholder="Key"
                      className="flex-1 px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      value={h.value}
                      onChange={(e) => handleUpdateHeader(i, 'value', e.target.value)}
                      placeholder="Value"
                      className="flex-1 px-3 py-2 border rounded"
                    />
                    <button
                      onClick={() => handleRemoveHeader(i)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'body' && (
          <div>
            <div className="mb-3">
              <select
                value={currentRequest.bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                className="px-3 py-2 border rounded"
              >
                <option value="none">None</option>
                <option value="json">JSON</option>
                <option value="text">Text</option>
                <option value="xml">XML</option>
              </select>
            </div>
            {currentRequest.bodyType !== 'none' && (
              <textarea
                value={currentRequest.body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={`Enter ${currentRequest.bodyType} body`}
                className="w-full h-48 px-3 py-2 border rounded font-mono text-sm"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
