import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import { NotFoundError } from "../../domain/errors/NotFoundError"

export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(new NotFoundError(`Invalid ID: ${id}`))
  } else {
    next()
  }
}
