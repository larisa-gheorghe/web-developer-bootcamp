const mongoose = require('mongoose');
const {Schema} = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NOO, MONGO ERROR!")
    console.log(err)
})

const userSchema = new Schema({
    username: String,
    age: Number
})

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async() => {
//     //const user = new User({username: 'chickenfan99', age: 61});
//     const user = await User.findOne({username: 'chickenfan99'})
//     //const tweet1 = new Tweet({text: 'omg I love my chicken family!', likes: 104});
//     const tweet2 = new Tweet({text: 'bla bla bla', likes: 4});
//     tweet2.user = user;
//     //user.save();
//     tweet2.save();
// }

// makeTweets();

const findTweet = async () => {
    //const t = await Tweet.findOne({}).populate('user', 'username')
    const t = await Tweet.find({}).populate('user')
    console.log(t);
}

findTweet();