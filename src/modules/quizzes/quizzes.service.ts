import responseUtils from '../../common/utilities/response.utils';
import DAL from '../../common/dataAccessLayer';
import { IQuestion } from './interfaces/question';
import answerModel from './models/answer.model';
import questionModel from './models/question.model';
import { FilterQuery } from 'mongoose';
import HttpException from '../../common/utilities/exceptions/http.exceptions';
import { IAnswer } from './interfaces/answer';

const questionsDAL = new DAL(questionModel);
const answersDAL = new DAL(answerModel);
class QuizServices {
  private questionsRepo: typeof questionsDAL;
  private answersRepo: typeof answersDAL;

  constructor() {
    this.questionsRepo = questionsDAL;
    this.answersRepo = answersDAL;
  }

  //   questions
  public async createQuestion(payload: IQuestion) {
    try {
      payload.answers = [];
      const questionInstance = await this.questionsRepo.create(payload);
      const savedQuestion = await this.questionsRepo.save(questionInstance);
      return responseUtils.buildResponse({ data: savedQuestion });
    } catch (error) {
      return responseUtils.buildFailedResponse({ message: error });
    }
  }

  public async getAllQuestions(query: IQuestion) {
    try {
      const foundQuestions = await this.questionsRepo.findAll(
        query as unknown as FilterQuery<IQuestion>,
        ['answers lesson']
      );
      if (foundQuestions.length < 1) {
        return new HttpException(400, 'Questions not found');
      }
      return responseUtils.buildResponse({ data: foundQuestions });
    } catch (error) {
      return responseUtils.buildFailedResponse({ message: error });
    }
  }

  public async getOneQuestion(query: IQuestion) {
    try {
      const foundQuestions = await this.questionsRepo.findOne(
        query as unknown as FilterQuery<IQuestion>,
        ['answers lesson']
      );
      if (!foundQuestions) {
        return new HttpException(400, 'Question not found');
      }
      return responseUtils.buildResponse({ data: foundQuestions });
    } catch (error) {
      return responseUtils.buildFailedResponse({ message: error });
    }
  }

  //   answers
  public async createAnswer(payload: IAnswer) {
    try {
      // verify question
      const foundQuestion = await this.questionsRepo.findOne({
        _id: payload.question,
      });
      if (!foundQuestion) {
        return new HttpException(400, 'Invalid Question');
      }

      const answerInstance = await this.answersRepo.create(payload);
      const savedAnswer = await this.answersRepo.save(answerInstance);

      // attach answer to question
      foundQuestion.answers.push(savedAnswer._id);
      await this.questionsRepo.save(foundQuestion);

      return responseUtils.buildResponse({ data: savedAnswer });
    } catch (error) {
      return responseUtils.buildFailedResponse({ message: error });
    }
  }

  public async getAllAnswers(query: IAnswer) {
    try {
      const foundQuestions = await this.answersRepo.findAll(
        query as unknown as FilterQuery<IAnswer>,
        ['question']
      );
      if (foundQuestions.length < 1) {
        return new HttpException(400, 'Answers not found');
      }
      return responseUtils.buildResponse({ data: foundQuestions });
    } catch (error) {
      return responseUtils.buildFailedResponse({ message: error });
    }
  }
}

export default QuizServices;
