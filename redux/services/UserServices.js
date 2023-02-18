import { BaseServices } from './BaseServices'

class UserServices extends BaseServices {
    login = (data) => this.post('/api/user', data)
    getAllUser = () => this.get('/api/user')
    getUser = (userID) => this.get(`/api/user/${userID}`)
    updateUser = (userID, data) => this.patch(`/api/user/${userID}`, data)
    deleteUser = (userID) => this.delete(`/api/user/${userID}`)
}

export const userServices = new UserServices()