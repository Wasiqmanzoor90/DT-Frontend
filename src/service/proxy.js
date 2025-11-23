import api from "./api"

export const ProxyService={
    sendRequest: async(RequestData)=>{
const response = await api.post('/Proxy/send', RequestData)
return response.data;
    },

    sendSavedRequest: async(httpModelId)=>{
        const response = await api.post(`Proxy/send${httpModelId}`)
        return response.data;
    }
}
    