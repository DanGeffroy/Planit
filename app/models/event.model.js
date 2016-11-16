// ```
// event.model.js
// (c) 2016 David Newman
// david.r.niciforovic@gmail.com
// event.model.js may be freely distributed under the MIT license
// ```

// */app/models/event.model.js*

// ## Event Model

// Note: MongoDB will autogenerate an _id for each Event object created

// Grab the Mongoose module
import mongoose from 'mongoose';

// Create a `schema` for the `Event` object
let eventSchema = new mongoose.Schema({
  title: { type : String },
  date: { type : String },
  place: { type : String },
  tags: { type: Array },
  description: { type : String },
  attendees: [{
    name: {
      type: String
    },
    shoppingList: [{name :String, qte:Number}]
  }],
  shoppingList: [{name :String, qte:Number,realqte: Number}]
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Event', eventSchema);
