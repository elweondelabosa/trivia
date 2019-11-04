
const express = require('express');
const mongoose = require('mongoose');


const port = process.env.PORT        || 3000;
const db   = process.env.MONGODB_URI || 'mongodb://localhost/trivia';


const app = express();


mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected @ ${db}`);
  })
.catch(err => console.error(`Connection error ${err}`));


const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true }
});

const Question = mongoose.model('Question', QuestionSchema);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'pug');
app.set('views', './views');


app.post('/question', (req, res) => {
  let question = new Question({
    question: req.body.question
  });
  question.save(err => {
    res.redirect('/');
  });
});

app.get('/', (req, res) => {
  Question.find((err, questions) => {
    res.render('index', { questions: questions });
  });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
