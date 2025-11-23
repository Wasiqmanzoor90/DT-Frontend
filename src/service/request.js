import api from "./api"
export const requestService = {
    getAll: async()=>{
        const response = await api.get('/Request')
        return response.data
    },

    getByCollectionId: async(CollectionId)=>{
const response = await api.get(`/Collection${CollectionId}`)
return response.data
    },
    create: async()=>{
        const response = await api.post('/Request')
        return response.data
    },

    edit: async(id)=>{
        const response = await api.put(`/Request${id}`)
        return response.data
    },

    deleted: async(Id)=>{
        const response = api.delete(`/Request${Id}`)
        return response.data

    }
}