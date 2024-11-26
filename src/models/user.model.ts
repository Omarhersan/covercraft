import { Schema, model, SchemaTypes } from 'mongoose';
import cover from './cover.models';

const userSchema = new Schema({
    id : { type: SchemaTypes.ObjectId },
    name: { type: SchemaTypes.String, required: true },
    email: { type: SchemaTypes.String, required: true },
    password: { type: SchemaTypes.String, required: true },
    role: { type: SchemaTypes.String, default: 'user' },
    status: { type: SchemaTypes.String },
    playlists: { type: SchemaTypes.Array, default: [] },
    covers: { type: SchemaTypes.Array, default: [] }
});

const user = model('user', userSchema);
export default user;