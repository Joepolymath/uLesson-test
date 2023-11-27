import DAL from '../../common/dataAccessLayer';
import categoryModel from './models/category.model';
import subjectModel from './models/subject.model';
import chapterModel from './models/chapter.model';
import lessonModel from './models/lesson.model';
import { ISubject } from './interfaces/subject';
import responseUtils from '../../common/utilities/response.utils';
import { FilterQuery } from 'mongoose';
import { IChapter } from './interfaces/chapter';
import { ICategory } from './interfaces/categories';
import HttpException from '../../common/utilities/exceptions/http.exceptions';
import { ILesson } from './interfaces/lesson';

const subjectDAL = new DAL(subjectModel);
const chapterDAL = new DAL(chapterModel);
const categoriesDAL = new DAL(categoryModel);
const lessonDAL = new DAL(lessonModel);

class LessonServices {
  private categoriesRepo: typeof categoriesDAL;
  private subjectRepo: typeof subjectDAL;
  private chapterRepo: typeof chapterDAL;
  private lessonRepo: typeof lessonDAL;

  constructor() {
    this.subjectRepo = subjectDAL;
    this.chapterRepo = chapterDAL;
    this.categoriesRepo = categoriesDAL;
    this.lessonRepo = lessonDAL;
  }

  /**
   *
   * # Subjects
   *
   */
  public async createSubject(payload: ISubject) {
    try {
      const newSubject = await this.subjectRepo.create(payload);
      const savedSubject = await this.subjectRepo.save(newSubject);
      return responseUtils.buildResponse({ data: savedSubject });
    } catch (error) {
      return responseUtils.buildFailedResponse({ message: error });
    }
  }

  public async getAllSubjects(query: ISubject) {
    try {
      const foundSubjects = await this.subjectRepo.findAll(
        query as FilterQuery<ISubject>,
        ['chapters', '_id title serialNo']
      );
      if (!foundSubjects) {
        return new HttpException(400, 'Subjects not found');
      }
      return responseUtils.buildResponse({ data: foundSubjects });
    } catch (error) {
      return responseUtils.buildFailedResponse({ message: error });
    }
  }

  /**
   *
   * # Chapters
   *
   */
  public async createChapter(payload: IChapter) {
    try {
      payload.categories = [];
      // verify subject
      const foundSubject = await this.subjectRepo.findOne({
        _id: payload.subject,
      });
      if (!foundSubject) {
        return new HttpException(400, 'Invalid Subject');
      }
      const foundChapters = await this.chapterRepo.findAll({
        subject: payload.subject,
      });
      let serialNo: number;
      if (foundChapters.length < 1) {
        serialNo = 1;
      } else {
        const lastChapter = foundChapters[foundChapters.length - 1];

        serialNo = lastChapter.serialNo + 1;
      }
      payload.serialNo = serialNo;
      const newChapter = await this.chapterRepo.create(payload);

      const savedChapter = await this.chapterRepo.save(newChapter);

      // attach chapter to subject
      foundSubject.chapters.push(savedChapter._id);
      await this.subjectRepo.save(foundSubject);

      return responseUtils.buildResponse({ data: savedChapter });
    } catch (error) {
      return responseUtils.buildFailedResponse({ message: error });
    }
  }

  public async getAllChapters(query: IChapter) {
    try {
      const foundChapters = await this.chapterRepo.findAll(
        query as FilterQuery<IChapter>,
        ['categories subject', '_id title']
      );
      if (!foundChapters) {
        return new HttpException(400, 'Chapters not found');
      }
      return responseUtils.buildResponse({ data: foundChapters });
    } catch (error) {
      return responseUtils.buildFailedResponse({ message: error });
    }
  }

  /**
   *
   * # Categories
   *
   */
  public async createCategories(payload: ICategory) {
    try {
      payload.lessons = [];
      // verify chapter
      const foundChapter = await this.chapterRepo.findOne({
        _id: payload.chapter,
      });
      if (!foundChapter) {
        return new HttpException(400, 'Invalid Chapter');
      }

      const newCategory = await this.categoriesRepo.create(payload);
      const savedCategory = await this.categoriesRepo.save(newCategory);

      // attaching category to chapter
      foundChapter.categories.push(savedCategory._id);
      await this.chapterRepo.save(foundChapter);

      return responseUtils.buildResponse({ data: savedCategory });
    } catch (error) {
      return responseUtils.buildFailedResponse({ message: error });
    }
  }

  public async getAllCategories(query: ICategory) {
    try {
      const foundCategories = await this.categoriesRepo.findAll(
        query as FilterQuery<ICategory>,
        ['lessons chapter', '_id title']
      );
      if (!foundCategories) {
        return new HttpException(400, 'Categories not found');
      }
      return responseUtils.buildResponse({ data: foundCategories });
    } catch (error) {
      return responseUtils.buildFailedResponse({ message: error });
    }
  }

  /**
   *
   * # Lessons
   *
   */
  public async createLesson(payload: ILesson) {
    try {
      // verify category
      const foundCategory = await this.categoriesRepo.findOne({
        _id: payload.category,
      });
      if (!foundCategory) {
        return new HttpException(400, 'Invalid Category');
      }

      const newLesson = await this.lessonRepo.create(payload);
      const savedLesson = await this.lessonRepo.save(newLesson);

      // attaching lesson to category
      foundCategory.lessons.push(savedLesson._id);
      await this.categoriesRepo.save(foundCategory);

      return responseUtils.buildResponse({ data: savedLesson });
    } catch (error) {
      return responseUtils.buildFailedResponse({ message: error });
    }
  }

  public async getAllLessons(query: ILesson) {
    try {
      const foundLessons = await this.lessonRepo.findAll(
        query as FilterQuery<ILesson>,
        ['category', '_id title']
      );
      if (!foundLessons) {
        return new HttpException(400, 'Lessons not found');
      }
      return responseUtils.buildResponse({ data: foundLessons });
    } catch (error) {
      return responseUtils.buildFailedResponse({ message: error });
    }
  }
}

export default LessonServices;
