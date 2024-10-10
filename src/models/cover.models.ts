import { Schema, model, SchemaTypes } from 'mongoose';
import playlist from './playlist.models';
import user from './user.model';

const coverSchema = new Schema({
    cover_id: { type: SchemaTypes.ObjectId },
    name: { type: SchemaTypes.String, required: true },
    playlist_id : { type: SchemaTypes.ObjectId, ref: playlist, required: true },
    user_id: { type: SchemaTypes.ObjectId, required: true, ref: user },
    status: { type: SchemaTypes.String }
    
});

const cover = model('cover', coverSchema);
export default cover;