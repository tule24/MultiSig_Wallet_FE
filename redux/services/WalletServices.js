import { BaseServices } from './BaseServices'

class WalletServices extends BaseServices {
    createWallet = (data) => this.post('/api/wallet', data)
    getAllWallet = () => this.get('/api/wallet')
    getWallet = (field, value) => this.get(`/api/wallet/${field}/${value}`)
    updateWallet = (walletID, data) => this.patch(`/api/wallet/${walletID}`, data)
    deleteWallet = (walletID) => this.delete(`/api/wallet/${walletID}`)
}

export const walletServices = new WalletServices()