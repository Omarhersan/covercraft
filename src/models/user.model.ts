import { Schema, model, SchemaTypes } from 'mongoose';

const userSchema = new Schema({
    name: { type: SchemaTypes.String, required: true },
    email: { type: SchemaTypes.String, required: true },
    password: { type: SchemaTypes.String, required: true },
    role: { type: SchemaTypes.String, default: 'user' },
    status: { type: SchemaTypes.String }
});

const user = model('user', userSchema);
export default user;