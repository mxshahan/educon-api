import mongoose from 'mongoose';
// import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';
import { Crud } from '@utl';

const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is Required!!']
  },
  category: {
    type: String,
    trim: true,
    required: [true, 'Category is required!']
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'
  },
  questions: [{
    type: String
  }]
});

TestSchema.plugin(uniqueValidator);
TestSchema.plugin(timestamp);

const TestModel = mongoose.model('TestModel', TestSchema);
const TestCrud = new Crud(TestModel);

export {
  TestCrud,
  TestModel
};
