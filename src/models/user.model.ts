import { Schema, model, SchemaTypes } from 'mongoose';
import cover from './cover.models';
import bcrypt from 'bcryptjs';

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

// Método para hashear la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

// Comparar la contraseña ingresada con la hasheada
userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const user = model('user', userSchema);
export default user;
