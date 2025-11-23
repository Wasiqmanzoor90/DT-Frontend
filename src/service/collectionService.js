
import api from "./api"

export const CollectionService = {
    getAll: async()=>{
        const response = await api.get('/Collection')
        return response.data
    },
    getById: async(id)=>{
        const response = await api.get`/Collection${id}`
        return response.data
    },

    create: async(data)=>{
        const response = await api.post('/Collection', data)
        return response.data;
    },

}