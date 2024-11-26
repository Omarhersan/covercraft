import { Types } from 'mongoose';
export interface Cover {
    cover_id?: Types.ObjectId; 
    name: string;
    playlist_id: Types.ObjectId;
    user_id: Types.ObjectId;
    status?: string; 
}