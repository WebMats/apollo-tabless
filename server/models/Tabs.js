const { Schema, ...mongoose } = require('mongoose');


const tabSchema = new Schema({
    tabUrl: { type: String, required: true },
    importance: { type: String, required: false },
    category: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Tab', tabSchema);