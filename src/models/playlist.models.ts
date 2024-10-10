import { Schema, model, SchemaTypes } from 'mongoose';

const playlistSchema = new Schema({
    playlist_id : { type: SchemaTypes.ObjectId },
    name: { type: SchemaTypes.String, required: true },
    user_id: { type: SchemaTypes.ObjectId, required: true },
    songs: { 
        type: [{ 
            name: { type: SchemaTypes.String, required: true },
            artist: { type: SchemaTypes.String, required: true },
            album: { type: SchemaTypes.String },
            duration: { type: SchemaTypes.Number } // por ejemplo, duración en segundos
        }], 
        default: [] 
    }
});

const playlist = model('playlist', playlistSchema);
export default playlist;
