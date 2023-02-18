import { Schema, model, models, Types } from "mongoose"
import WAValidator from "wallet-address-validator"

const walletSchema = new Schema({
    address: {
        type: String,
        require: [true, "Please provide wallet address"],
        unique: true,
        immutable: true,
        lowercase: true,
        validate: {
            validator: function (val) {
                return WAValidator.validate(val, 'ETH', 'testnet')
            },
            message: "Only accept eth wallet"
        }
    },
    owners: {
        type: [String],
        require: [true, "Please provide array owners"],
        validate: {
            validator: function (val) {
                return val.every(el => WAValidator.validate(el, 'ETH', 'testnet'))
            },
            message: "Only accept eth wallet"
        }
    },
    approvalRequired: {
        type: Number,
        require: [true, "Please prove approve require"],
        min: 1,
        validate: {
            validator: function (val) {
                return val <= this.owners.length
            },
            message: "approvalRequired must be <= totalOwner"
        }
    },
    balance: {
        type: Number,
        default: 0
    },
    balanceLock: {
        type: Number,
        default: 0
    },
    balanceFree: {
        type: Number,
        default: 0
    },
    totalId: {
        type: Number,
        default: 0
    },
    transactionId: {
        type: Number,
        default: 0
    },
    consensusId: {
        type: Number,
        default: 0
    },
    successId: {
        type: Number,
        default: 0
    },
    failedId: {
        type: Number,
        default: 0
    },
    pendingId: {
        type: Number,
        default: 0
    }
}, { timestamps: true, versionKey: false })

export default models.Wallet || model('Wallet', walletSchema)