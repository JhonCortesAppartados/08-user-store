import mongoose, { Schema } from "mongoose";


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    available: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

//Esto es para poder serializar la informacion, es como decirle a la DB como mostrar la informacion:
categorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options){
        delete ret._id;
    },
})

export const CategoryModel = mongoose.model('Category', categorySchema);