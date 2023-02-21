import { Schema, model, models } from "mongoose"
import WAValidator from "wallet-address-validator"

const proposalSchema = new Schema({
    walletId: {
        type: Schema.Types.ObjectId,
        require: [true, "Please provide wallet id"],
        immutable: true,
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
        enum: ["transaction", "consensus"]
    },
    creator: {
        type: String,
        immutable: true,
        require: [true, "Please provide creator address"]
    },
    state: {
        type: String,
        default: "pending",
        enum: ["pending", "success", "fail"]
    },
    accept: {
        type: Number,
        default: 1
    },
    reject: {
        type: Number,
        default: 0
    },
    votes: [Object],
    addOwners: {
        type: [String],
        validate: {
            validator: function (val) {
                return val.every(el => WAValidator.validate(el, 'ETH', 'testnet'))
            },
            message: "Only accept eth wallet"
        }
    },
    delOwners: {
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
}, { timestamps: true, versionKey: false })

export default models?.Proposal || model('Proposal', proposalSchema)