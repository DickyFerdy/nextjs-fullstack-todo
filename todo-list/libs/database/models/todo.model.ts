import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.models.Todo || mongoose.model('Todo', todoSchema);
