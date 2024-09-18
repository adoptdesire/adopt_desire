import { Request, Response } from 'express';
import { CATCH_ASYNC as catchAsync } from '../utils/catch-async';
import { NewsLetter } from '../database/models/news-letter';
import ADD_TO_NEWS_LETTER from '../services/news-letter.service';
import { APIResponse, IDataResponse } from '../helpers/api-response';
import { MESSAGES as messages } from '../helpers/response-messages';

const ADD_NEWS_LETTER = catchAsync(async (req: Request, res: Response) => {
  const RESPONSE = await ADD_TO_NEWS_LETTER(req.body as NewsLetter);
  const PAYLOAD: IDataResponse = {
    data: RESPONSE,
  };
  return res.send(new APIResponse(true, false, 200, `News letter ${messages.succeed}`, PAYLOAD));
});

export default ADD_NEWS_LETTER;
