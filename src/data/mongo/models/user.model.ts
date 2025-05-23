import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    emailValidated: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: [true, 'Name is required']
    },
    img: {
        type: String,
    },
    role:{
        type: [String],
        default: ['USER_ROLE'],
        enum: ['USER_ROLE', 'ADMIN_ROLE'],
    }
});


//Esto es para poder serializar la informacion, es como decirle a la DB como mostrar la informacion:
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options){
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        delete ret.emailValidated;
        delete ret.role;
    },
})


export const UserModel = mongoose.model('User', userSchema);