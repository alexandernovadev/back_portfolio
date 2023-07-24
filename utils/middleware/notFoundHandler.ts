import { Response, Request } from 'express';
import boom from '@hapi/boom';

const notFoundHandler = (req: Request, res: Response): void => {
  const {
    output: { statusCode, payload }
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

export default notFoundHandler;
