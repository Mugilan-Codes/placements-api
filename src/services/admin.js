import { Listing } from '../models';
import { adminDao, courseDao } from '../dao';
import { bcryptPass, Role, token } from '../utils';
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

  // TODO: backlog_history automatically adjusted as active_backlog. it must not be less
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
      const titleExists = await Listing.findIdByTitle(listing.title);
      if (titleExists) {
        return { err_msg: 'Listing Title already exists' };
      }

      const newListing = await Listing.add(listing);

      // retrieve listing details using title and id

      return newListing;
    } catch (err) {
      console.log(`${this.className} --> addListing`);
      throw new Error(err.message);
    }
  };

  getAllListings = async () => {
    try {
      const listings = await Listing.findAll();

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
      const listing = await Listing.findById(list_id);
      if (!listing) {
        return { err_msg: 'Listing not found' };
      }

      return listing;
    } catch (err) {
      console.log(`${this.className} --> getOneListing`);
      throw new Error(err.message);
    }
  };

  deleteOneListing = async (list_id) => {
    try {
      const listing = await Listing.findById(list_id);
      if (!listing) {
        return { err_msg: 'Listing not found' };
      }
      const deleteListing = await Listing.deleteById(list_id);

      return deleteListing;
    } catch (err) {
      console.log(`${this.className} --> deleteOneListing`);
      throw new Error(err.message);
    }
  };
}

export default new AdminService();
