import { NextFunction, Request, Response, Router } from 'express';
import Controller from '../../common/utilities/interfaces/controller.interface';
import LessonServices from './lessons.service';
import HttpException from '../../common/utilities/exceptions/http.exceptions';
import { ISubject } from './interfaces/subject';
import { IChapter } from './interfaces/chapter';
import { ICategory } from './interfaces/categories';
import { ILesson } from './interfaces/lesson';

const lessonServices = new LessonServices();

export default class LessonController implements Controller {
  public path: string = '/lessons';
  public router: Router = Router();

  constructor() {
    this.loadRoutes();
  }

  private loadRoutes() {
    // subjects
    this.router.post(`${this.path}/subjects`, this.createSubject);
    this.router.get(`${this.path}/subjects`, this.getSubjects);

    //  chapters
    this.router.post(`${this.path}/chapters`, this.createChapter);
    this.router.get(`${this.path}/chapters`, this.getChapters);

    //  categories
    this.router.post(`${this.path}/categories`, this.createCategory);
    this.router.get(`${this.path}/categories`, this.getCategories);

    //  lessons
    this.router.get(`${this.path}/videos`, this.getLessons);
  }

  private async createSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await lessonServices.createSubject(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  private async getSubjects(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await lessonServices.getAllSubjects(
        req.query as unknown as ISubject
      );
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  //   chapters
  private async createChapter(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await lessonServices.createChapter(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  private async getChapters(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await lessonServices.getAllChapters(
        req.query as unknown as IChapter
      );
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  //   categories
  private async createCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await lessonServices.createCategories(req.body);
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  private async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await lessonServices.getAllCategories(
        req.query as unknown as ICategory
      );
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }

  //   lessons
  private async getLessons(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await lessonServices.getAllLessons(
        req.query as unknown as ILesson
      );
      return res
        .status(data.statusCode)
        .json({ ...data, message: data.message });
    } catch (error: any) {
      next(new HttpException(500, error.message));
    }
  }
}
