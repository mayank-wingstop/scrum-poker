import { server } from './index';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
