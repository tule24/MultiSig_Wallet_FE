import WAValidator from "wallet-address-validator"

const minifyAddress = (address, len) => {
    const start = address.substring(0, len)
    const end = address.substring(address.length - len)
    return `${start}...${end}`
}

const eth2usd = async (amount) => {
    try {
        const data = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd").then(res => res.json())
        const eth2usd = data ? data['ethereum']['usd'] : 0
        const amount_in_usd = amount * eth2usd
        const rounded_two_decimals = Math.round(amount_in_usd * 1000) / 1000
        return rounded_two_decimals
    } catch (error) {
        return 0
    }
}

const checkAddressValid = (address) => {
    return WAValidator.validate(address, 'ETH', 'testnet')
}

const isOwner = (address, owners) => {
    return owners.includes(address)
}

const checkDistinct = (owners) => {
    let s = new Set()
    owners.forEach(el => s.add(el))
    return s.size === owners.length
}
export { minifyAddress, eth2usd, checkAddressValid, isOwner, checkDistinct }