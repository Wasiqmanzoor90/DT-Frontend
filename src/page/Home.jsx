import { RequestBuilder } from "../component/RequestBuilder/RequestBuilder";
import { ResponseViewer } from "../component/ResponseBuilder/ResponseBuilder";


export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <RequestBuilder />
      </div>
      <div className="flex-1 overflow-auto border-t">
        <ResponseViewer />
      </div>
    </div>
  );
}