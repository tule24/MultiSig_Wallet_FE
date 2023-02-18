import { BaseServices } from './BaseServices'

class ProposalServices extends BaseServices {
    createProposal = (data) => this.post('/api/proposal', data)
    getAllProposal = () => this.get('/api/proposal')
    getProposal = (proposalID) => this.getWallet(`/api/proposal/${proposalID}`)
    updateProposal = (proposalID, data) => this.patch(`/api/proposal/${proposalID}`, data)
}

export const proposalServices = new ProposalServices()