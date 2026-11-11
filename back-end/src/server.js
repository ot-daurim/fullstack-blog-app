import express from 'express';

const articlesInfo = [
  {name: 'learn-react', upvote: 0, comments: []},
  {name: 'learn-node', upvote: 0, comments: []},
  {name: 'learn-mongodb', upvote: 0, comments: []},
]

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post('/api/articles/:name/upvote', (req, res) => {
  const article = articlesInfo.find(a => a.name === req.params.name);
  article.upvote += 1;
  res.send(`Success! The article ${req.params.name} now has ${article.upvote} upvotes.`);
});

app.post('/api/articles/:name/comments', (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  const article = articlesInfo.find(a => a.name === name);

  article.comments.push({ 
    postedBy, 
    text 
  });

  res.json(article);
});


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});