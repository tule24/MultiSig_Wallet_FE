import { Schema, model, models } from "mongoose"
import WAValidator from "wallet-address-validator"

const userSchema = new Schema({
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
    wallets: {
        type: [String],
        require: [true, "Please provide array wallet"],
        validate: {
            validator: function (val) {
                return val.every(el => WAValidator.validate(el, 'ETH', 'testnet'))
            },
            message: "Only accept eth wallet"
        }
    },
}, {timestamps: true})

export default models.User || model('User', userSchema)