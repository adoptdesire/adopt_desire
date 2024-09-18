import { Request, Response, NextFunction } from 'express';

// Define the type for the function that catchAsync will take
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export const CATCH_ASYNC =
    (asyncHandler: AsyncHandler) =>
    (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(asyncHandler(req, res, next)).catch(next);
    };
