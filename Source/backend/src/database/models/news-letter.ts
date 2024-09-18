import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import SEQUELIZE from '../connection';

export interface INewsLetterAttributes {
  id?: number;
  email: string;
}

export class NewsLetter
  extends Model<InferAttributes<NewsLetter>, InferCreationAttributes<NewsLetter>>
  implements INewsLetterAttributes
{
  declare id?: CreationOptional<number>;
  declare email: string;
}

NewsLetter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // optional: ensures the string is a valid email
      },
    },
  },
  {
    sequelize: SEQUELIZE,
    modelName: 'NewsLetter',
    tableName: 'news_letter',
    timestamps: true,
  },
);
