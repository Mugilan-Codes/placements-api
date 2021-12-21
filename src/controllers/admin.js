import { AdminService } from '../services';
import { ApiError, logger } from '../utils';

class AdminController {
  className = 'AdminController';

  register = async (req, res, next) => {
    try {
      const admin = await AdminService.register(req.body);

      if (admin.err_msg) {
        return next(ApiError.conflict(admin.err_msg));
      }

      res.json(admin);
    } catch (err) {
      logger.error(`${this.className} --> register`);
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const admin = await AdminService.login(req.body);

      if (admin.err_msg) {
        return next(ApiError.unauthorized(admin.err_msg));
      }

      res.json(admin);
    } catch (err) {
      logger.error(`${this.className} --> login`);
      next(err);
    }
  };

  getDetail = async (req, res, next) => {
    try {
      const detail = await AdminService.getOne(req.user.sub);
      res.json(detail);
    } catch (err) {
      logger.error(`${this.className} --> getDetail`);
      next(err);
    }
  };

  addCourse = async (req, res, next) => {
    try {
      const course = await AdminService.addCourse(req.body);

      if (course.err_msg) {
        return next(ApiError.conflict(course.err_msg));
      }

      res.json({ course });
    } catch (err) {
      logger.error(`${this.className} --> addCourse`);
      next(err);
    }
  };

  getOneCourse = async (req, res, next) => {
    const { course_id } = req.params;
    try {
      const course = await AdminService.getOneCourse(course_id);

      if (course.err_msg) {
        return next(ApiError.notFound(course.err_msg));
      }

      res.json(course);
    } catch (err) {
      logger.error(`${this.className} --> getOneCourse`);
      next(err);
    }
  };

  updateOneCourse = async (req, res, next) => {
    const {
      body,
      params: { course_id },
    } = req;
    try {
      const course = await AdminService.updateOneCourse(course_id, body);
      if (course.err_msg) {
        return next(ApiError.notFound(course.err_msg));
      }

      res.json(course);
    } catch (err) {
      logger.error(`${this.className} --> updateOneCourse`);
      next(err);
    }
  };

  deleteOneCourse = async (req, res, next) => {
    const { course_id } = req.params;
    try {
      const course = await AdminService.deleteOneCourse(course_id);
      if (course.err_msg) {
        return next(ApiError.notFound(course.err_msg));
      }

      res.json(course);
    } catch (err) {
      logger.error(`${this.className} --> deleteOneCourse`);
      next(err);
    }
  };

  addListing = async (req, res, next) => {
    try {
      const listing = await AdminService.addListing(req.body);

      if (listing.err_msg) {
        return next(ApiError.conflict(listing.err_msg));
      }

      res.json(listing);
    } catch (err) {
      logger.error(`${this.className} --> addListing`);
      next(err);
    }
  };

  getAllListings = async (req, res, next) => {
    try {
      const listings = await AdminService.getAllListings();

      if (listings.err_msg) {
        return next(ApiError.notFound(listings.err_msg));
      }

      res.json(listings);
    } catch (err) {
      logger.error(`${this.className} --> getAllListings`);
      next(err);
    }
  };

  getOneListing = async (req, res, next) => {
    const { list_id } = req.params;
    try {
      const listing = await AdminService.getOneListing(list_id);

      if (listing.err_msg) {
        return next(ApiError.notFound(listing.err_msg));
      }

      res.json(listing);
    } catch (err) {
      logger.error(`${this.className} --> getOneListing`);
      next(err);
    }
  };

  updateOneListing = async (req, res, next) => {
    const {
      body,
      params: { list_id },
    } = req;
    try {
      const listing = await AdminService.updateOneListing(list_id, body);
      if (listing.err_msg) {
        return next(ApiError.notFound(listing.err_msg));
      }

      res.json(listing);
    } catch (err) {
      logger.error(`${this.className} --> updateOneListing`);
      next(err);
    }
  };

  deleteOneListing = async (req, res, next) => {
    const { list_id } = req.params;
    try {
      const listing = await AdminService.deleteOneListing(list_id);

      if (listing.err_msg) {
        return next(ApiError.notFound(listing.err_msg));
      }

      res.json(listing);
    } catch (err) {
      logger.error(`${this.className} --> deleteOneListing`);
      next(err);
    }
  };
}

export default new AdminController();
