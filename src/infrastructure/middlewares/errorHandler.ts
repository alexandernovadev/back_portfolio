import { NextFunction, Request, Response } from "express"
import { NotFoundError } from "../../domain/errors/NotFoundError"

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof NotFoundError) {
    res.status(404).json({ message: err.message })
  } else {
    // Handle any other types of errors here
    res.status(500).json({ message: "Internal server error" })
  }
}
