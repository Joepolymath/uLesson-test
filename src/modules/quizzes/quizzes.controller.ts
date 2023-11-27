import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../../common/utilities/interfaces/controller.interface';
import QuizServices from './quizzes.service';
import HttpException from '../../common/utilities/exceptions/http.exceptions';
import { IQuestion } from './interfaces/question';
import { IAnswer } from './interfaces/answer';

const quizServices = new QuizServices();
export default class QuizController implements Controller {
  public path: string = '/quizzes';
  public router: Router = Router();

  constructor() {
    this.loadRoutes();
  }

  private loadRoutes() {
    this.router.post(`${this.path}/questions`, this.createQuestion);
    this.router.get(`${this.path}/questions`, this.getAllQuestions);
    this.router.get(`${this.path}/questions/:_id`, this.getOneQuestion);

    //  answers
    this.router.post(`${this.path}/answers`, this.createAnswer);
    this.router.get(`${this.path}/answers`, this.getAllAnswers);
  }

  //   questions
  private async createQuestion(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await quizServices.createQuestion(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  private async getAllQuestions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await quizServices.getAllQuestions(
        req.query as unknown as IQuestion
      );
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  private async getOneQuestion(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await quizServices.getOneQuestion(
        req.params as unknown as IQuestion
      );
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  //   answers
  private async createAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await quizServices.createAnswer(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  private async getAllAnswers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await quizServices.getAllAnswers(
        req.query as unknown as IAnswer
      );
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }
}
