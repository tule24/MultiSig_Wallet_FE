import { BaseServices } from './BaseServices'

class WalletServices extends BaseServices {
    createWallet = (data) => this.post('/api/wallet', data)
    getAllWallet = () => this.get('/api/wallet')
    getWallet = (walletID) => this.get(`/api/wallet/${walletID}`)
    updateWallet = (walletID, data) => this.patch(`/api/wallet/${walletID}`, data)
    deleteWallet = (walletID) => this.delete(`/api/wallet/${walletID}`)
}

export const walletServices = new WalletServices()