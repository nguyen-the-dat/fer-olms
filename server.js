import jsonServer from 'json-server';
import auth from 'json-server-auth';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'lib/db.json'));

const rules = auth.rewriter({
//   users: 600,
//   courses: 660,
//   categories: 644,
});

app.db = router.db;

app.use(cors());
app.use(jsonServer.bodyParser);

app.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/register') {
    const defaultFields = {
      profilePicture: 'https://i.pravatar.cc',
      bio: '',
      phone: '',
      socialMedia: {},
     
    };
    req.body = {
      ...defaultFields,
      ...req.body,
    };
  }
  next();
});

app.use(rules);
app.use(auth);
app.use(router);

app.listen(3001, () => {
  console.log('✅ JSON Server with Auth running at http://localhost:3001');
});
