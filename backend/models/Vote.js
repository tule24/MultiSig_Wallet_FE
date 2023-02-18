import { Schema, model, models, Types } from "mongoose"

const voteSchema = new Schema({
    proposalId: {
        type: Types.ObjectId,
        immutable: true,
        require: [true, "Please provide proposal ID"],
        ref: 'Proposal'
    },
    voter: {
        type: Types.ObjectId,
        immutable: true,
        require: [true, "Please provide voter id"],
        ref: 'User'
    },
    vote: {
        type: Boolean,
        require: [true, "Please provide option of vote, accept or reject"] // accept true, reject false
    }
}, {timestamps: true})

export default models.Vote || model('Vote', voteSchema)