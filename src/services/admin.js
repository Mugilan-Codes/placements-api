import { adminDao, courseDao, listingDao } from '../dao';
import { bcryptPass, isDifferent, isEmptyObject, Role, token } from '../utils';

class AdminService {
  className = 'AdminService';

  register = async (admin) => {
    const { name, email, password } = admin;
    try {
      const adminExists = await adminDao.findOne(email);
      if (adminExists) {
        return { err_msg: 'Admin already exists' };
      }

      const hashedPassword = await bcryptPass.hash(password);
      const newAdminId = await adminDao.add({
        name,
        email,
        password: hashedPassword,
      });

      const payload = {
        sub: newAdminId,
        role: Role.Admin,
      };

      const accessToken = token.sign(payload);
      const refreshToken = token.refresh.sign(payload);

      return { accessToken, refreshToken };
    } catch (err) {
      console.log(`${this.className} --> register`);
      if (err.sqlMessage) {
        throw new Error(err.sqlMessage);
      }
      throw new Error(err.message);
    }
  };

  login = async (admin) => {
    const { email, password } = admin;
    try {
      let user = await adminDao.findOne(email);
      if (!user) {
        return { err_msg: 'Invalid Credentials' };
      }

      user = await adminDao.findById(user.id);

      const isMatch = await bcryptPass.compare(password, user.password);
      if (!isMatch) {
        return { err_msg: 'Invalid Credentials' };
      }

      const payload = {
        sub: user.id,
        role: Role.Admin,
      };

      const accessToken = token.sign(payload);
      const refreshToken = token.refresh.sign(payload);

      return { accessToken, refreshToken };
    } catch (err) {
      console.log(`${this.className} --> login`);
      if (err.sqlMessage) {
        throw new Error(err.sqlMessage);
      }
      throw new Error(err.message);
    }
  };

  getOne = async (id) => {
    try {
      const admin = await adminDao.findById(id);
      if (!admin) {
        return { err_msg: 'Admin Not Found' };
      }

      const { password, ...result } = admin;

      return result;
    } catch (err) {
      console.log(`${this.className} --> getOne`);
      if (err.sqlMessage) {
        throw new Error(err.sqlMessage);
      }
      throw new Error(err.message);
    }
  };

  addCourse = async (course) => {
    const { degree, type, short_name, course_name, department } = course;
    try {
      // TODO: default value using some other way
      let typeDefault = type || 'R';
      // TODO: Change course_id to UUID instead of relying on correct entries for three fields
      const course_id = `${degree}-${short_name}-${typeDefault}`.toLowerCase();

      // TODO: have a effective way to check
      let course = await courseDao.findById(course_id);
      if (course) {
        return { err_msg: 'Course Id already exists!' };
      }

      course = await courseDao.findOne({ course_name });
      if (course) {
        return { err_msg: 'Course Name already exists!' };
      }

      course = await courseDao.findOne({ short_name, type: typeDefault });
      if (course) {
        return { err_msg: `${short_name} - ${typeDefault} already exists!` };
      }

      return await courseDao.add({
        id: course_id,
        degree,
        type,
        short_name,
        course_name,
        department,
      });
    } catch (err) {
      console.log(`${this.className} --> addCourse`);
      if (err.sqlMessage) {
        throw new Error(err.sqlMessage);
      }
      throw new Error(err.message);
    }
  };

  getOneCourse = async (course_id) => {
    try {
      const course = await courseDao.findById(course_id);
      if (!course) {
        return { err_msg: 'Course Not Found' };
      }

      return course;
    } catch (err) {
      console.log(`${this.className} --> getOneCourse`);
      throw new Error(err.message);
    }
  };

  updateOneCourse = async (course_id, courseUpdate) => {
    const { degree, type, short_name, course_name, department } = courseUpdate;
    try {
      let course = await courseDao.findById(course_id);
      if (!course) {
        return { err_msg: 'Course Not Found' };
      }

      console.log({ degree, short_name, type });
      let newCourse = {
        course_name,
        department,
      };
      Object.keys(newCourse).forEach((key) => {
        if (!isDifferent(newCourse[key], course[key])) {
          delete newCourse[key];
        }
      });
      console.log({ newCourse });
      if (isEmptyObject(newCourse)) {
        return { msg: 'No Changes' };
      }

      // TODO: generate new course_id
      // const listingByTitle =
      //   newListing.title && (await listingDao.findIdByTitle(newListing.title));
      // if (listingByTitle) {
      //   return { err_msg: 'Listing Title Already Exists, Try another one' };
      // }

      course = await courseDao.update(course_id, newCourse);

      return course;
    } catch (err) {
      console.log(`${this.className} --> updateOneCourse`);
      throw new Error(err.message);
    }
  };

  deleteOneCourse = async (course_id) => {
    try {
      let course = await courseDao.findById(course_id);
      if (!course) {
        return { err_msg: 'Course Not Found' };
      }

      course = await courseDao.deleteById(course_id);

      return { noOfDeletedRows: course, msg: 'Course Deleted' };
    } catch (err) {
      console.log(`${this.className} --> deleteOneCourse`);
      throw new Error(err.message);
    }
  };

  // TODO: backlog_history automatically adjusted as active_backlog. it must not be less
  // TODO: skip some attributes too
  addListing = async (listing) => {
    // const {
    //   title,
    //   description,
    //   company_name,
    //   start_date,
    //   tenth_percentage,
    //   twelfth_percentage,
    //   grad_percentage,
    //   cgpa,
    //   active_backlog,
    //   backlog_history,
    // } = listing;
    try {
      const titleExists = await listingDao.findIdByTitle(listing.title);
      if (titleExists) {
        return { err_msg: 'Listing Title already exists' };
      }

      const newListing = await listingDao.add(listing);

      // retrieve listing details using title and id

      return newListing;
    } catch (err) {
      console.log(`${this.className} --> addListing`);
      throw new Error(err.message);
    }
  };

  getAllListings = async () => {
    try {
      const listings = await listingDao.findAll();
      if (listings.length < 1) {
        return { err_msg: 'No Listings Available' };
      }

      return listings;
    } catch (err) {
      console.log(`${this.className} --> getAllListings`);
      throw new Error(err.message);
    }
  };

  getOneListing = async (list_id) => {
    try {
      const listing = await listingDao.findById(list_id);
      if (!listing) {
        return { err_msg: 'Listing not found' };
      }

      return listing;
    } catch (err) {
      console.log(`${this.className} --> getOneListing`);
      throw new Error(err.message);
    }
  };

  updateOneListing = async (list_id, list) => {
    const {
      title,
      description,
      company_name,
      start_date,
      tenth_percentage,
      twelfth_percentage,
      grad_percentage,
      cgpa,
      active_backlog,
      backlog_history,
    } = list;
    try {
      let listing = await listingDao.findById(list_id);
      if (!listing) {
        return { err_msg: 'Listing not found' };
      }

      let newListing = {
        title,
        description,
        company_name,
        start_date,
        tenth_percentage,
        twelfth_percentage,
        grad_percentage,
        cgpa,
        active_backlog,
        backlog_history,
      };
      Object.keys(newListing).forEach((key) => {
        if (!isDifferent(newListing[key], listing[key])) {
          delete newListing[key];
        }
      });
      if (isEmptyObject(newListing)) {
        return { msg: 'No Changes' };
      }

      const listingByTitle =
        newListing.title && (await listingDao.findIdByTitle(newListing.title));
      if (listingByTitle) {
        return { err_msg: 'Listing Title Already Exists, Try another one' };
      }

      listing = await listingDao.update(list_id, newListing);

      return listing;
    } catch (err) {
      console.log(`${this.className} --> updateOneListing`);
      throw new Error(err.message);
    }
  };

  deleteOneListing = async (list_id) => {
    try {
      const listing = await listingDao.findById(list_id);
      if (!listing) {
        return { err_msg: 'Listing not found' };
      }

      const deleteListing = await listingDao.deleteById(list_id);

      return deleteListing;
    } catch (err) {
      console.log(`${this.className} --> deleteOneListing`);
      throw new Error(err.message);
    }
  };
}

export default new AdminService();
