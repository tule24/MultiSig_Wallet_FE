import { Schema, model, models, Types } from "mongoose"
import WAValidator from "wallet-address-validator"

const proposalSchema = new Schema({
    walletId: {
        type: Types.ObjectId,
        require: [true, "Please provide wallet id"],
        immutable: true,
        ref: 'Wallet'
    },
    contractId: {
        type: Number,
        immutable: true,
        require: [true, "Please provide current ID from wallet contract"]
    },
    type: {
        type: String,
        immutable: true,
        require: [true, "Please provide type of proposal"],
        enum: ["Transaction", "Consensus"]
    },
    creator: {
        type: Types.ObjectId,
        immutable: true,
        require: [true, "Please provide creator id"],
        ref: 'User'
    },
    state: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Success", "Fail"]
    },
    approvals: {
        type: Number,
        default: 0
    },
    reject: {
        type: Number,
        default: 0
    },
    ownersAdd: {
        type: [String],
        validate: {
            validator: function (val) {
                return val.every(el => WAValidator.validate(el, 'ETH', 'testnet'))
            },
            message: "Only accept eth wallet"
        }
    },
    ownersDel: {
        type: [String],
        validate: {
            validator: function (val) {
                return val.every(el => WAValidator.validate(el, 'ETH', 'testnet'))
            },
            message: "Only accept eth wallet"
        }
    },
    approvalRequired: Number,
    to: {
        type: String,
        validate: {
            validator: function (val) {
                return WAValidator.validate(val, 'ETH', 'testnet')
            },
            message: "Only accept eth wallet"
        }
    },
    amount: Number,
    finishAt: {
        type: Date,
        immutable: true
    }
}, { timestamps: true })

export default models.Proposal || model('Proposal', proposalSchema)