import { Schema, model, models } from "mongoose"

const proposalSchema = new Schema({
    walletAddress: {
        type: String,
        validate: {
            validator: function (val) {
                return WAValidator.validate(val, 'ETH', 'testnet')
            },
            message: "Only accept eth wallet"
        }
    },
    walletId: {
        type: Number,
        require: [true, "Please provide current ID from multisig wallet"]
    },
    type: {
        type: String,
        require: [true, "Please provide type of proposal"],
        enum: ["Transaction", "Consensus"]
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
    creator: {
        type: String,
        require: [true, "Please provide creator wallet"],
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
        type: Date
    }
}, { timestamps: true })

export default models.Proposal || model('Proposal', proposalSchema)