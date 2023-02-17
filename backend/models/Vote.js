import { Schema, model, models } from "mongoose"
import WAValidator from "wallet-address-validator"

const voteSchema = new Schema({
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
    voter: {
        type: String,
        require: [true, "Please provide voter address"],
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
    vote: {
        type: Boolean,
        require: [true, "Please provide option of vote, accept or reject"] // accept true, reject false
    }
}, {timestamps: true})

export default models.Vote || model('Vote', voteSchema)