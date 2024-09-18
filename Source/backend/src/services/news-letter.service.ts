import SEQUELIZE from '../database/connection';
import { INewsLetterAttributes, NewsLetter } from '../database/models/news-letter';
import { MESSAGES as messages } from '../helpers/response-messages';
import LOGGER from '../logger/logger';
import { ApiError } from '../utils/api-error';

const CHECK_EXIST_NEWS_LETTER = async (email: string): Promise<NewsLetter[]> => {
  LOGGER.info('---------------------------------------------', SEQUELIZE.getDatabaseName());
  const RESPONSE = await NewsLetter.findAll({
    attributes: ['id', 'email'],
    where: {
      email,
    },
    raw: true,
  });
  return RESPONSE;
};

const ADD_TO_NEWS_LETTER = async (payloadData: INewsLetterAttributes): Promise<NewsLetter> => {
  const IS_NEWS_LETTER_EXIST = await CHECK_EXIST_NEWS_LETTER(payloadData.email);
  if (IS_NEWS_LETTER_EXIST && IS_NEWS_LETTER_EXIST.length > 0) {
    throw new ApiError(409, messages.existData);
  }
  const RESPONSE = await NewsLetter.create({
    email: payloadData.email,
  });

  return RESPONSE;
};

export default ADD_TO_NEWS_LETTER;
