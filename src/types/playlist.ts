import { Types } from 'mongoose';

export interface Playlist {
    playlist_id?: Types.ObjectId; 
    name: string;
    user_id: Types.ObjectId;
    songs?: string[]; 
}
