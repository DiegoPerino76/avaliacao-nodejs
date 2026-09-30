import database from './database';
import './model';
import app from './app';

database
  .sync()
  .then(() => {
    const port = process.env.PORT || 3001;

    app.listen(port, () => {
      console.log(`Servidor disponível em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });