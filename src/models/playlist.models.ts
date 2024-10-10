import { Schema, model, SchemaTypes } from 'mongoose';

const playlistSchema = new Schema({
    playlist_id : { type: SchemaTypes.ObjectId },
    name: { type: SchemaTypes.String, required: true },
    user_id: { type: SchemaTypes.ObjectId, required: true },
    songs: { type: SchemaTypes.Array, default: [] }
});

const playlist = model('playlist', playlistSchema);
export default playlist;