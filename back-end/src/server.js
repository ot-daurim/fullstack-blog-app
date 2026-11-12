import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

let db;

async function connectToDb() {
  const url = 'mongodb://127.0.0.1:27017';

  const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect();

  db = client.db('full-stack-react-db');
}

app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params;
  const article = await db.collection('articles').findOne({ name });
  res.json(article);
});

app.post('/api/articles/:name/upvote', async (req, res) => {
  const { name } = req.params;

  const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
    $inc: { upvote: 1 },
  }, {
    returnDocument: 'after',
  });

  res.json(updatedArticle);
});

app.post('/api/articles/:name/comments', async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  const newComment = { postedBy, text }
  const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
    $push: { comments: newComment }
  }, {
    returnDocument: 'after'
  });
  res.json(updatedArticle);
});


async function start() {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}

start();
