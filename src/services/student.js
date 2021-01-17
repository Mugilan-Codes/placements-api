import { Course, Student, Mark, Education, Listing } from '../models';
import { bcryptPass, Role, token, isDifferent, isEmptyObject } from '../utils';

class StudentService {
  className = 'StudentService';

  async register(student) {
    const { register_no, name, email, password, course_id } = student;
    try {
      let student = await Student.findOne({ register_no });
      if (student) {
        return { err_msg: 'Student with Register Number already exists!' };
      }

      student = await Student.findOne({ email });
      if (student) {
        return { err_msg: 'Email ID already exists!' };
      }

      // Check for course only when course_id is given
      if (course_id) {
        const course = await Course.findById(course_id);
        if (!course) {
          return { err_msg: 'Course does not exist' };
        }
      }

      const hashedPassword = await bcryptPass.hash(password);

      const created_on = new Date();
      const updated_on = new Date();

      const user = await Student.add({
        register_no,
        name,
        email,
        password: hashedPassword,
        course_id,
        created_on,
        updated_on,
      });

      const payload = {
        sub: user.register_no,
        role: Role.Student,
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
  }

  async login(student) {
    const { register_no, email, password } = student;
    try {
      const user = await Student.findOne({ register_no, email });
      if (!user) {
        return { err_msg: 'Invalid Credentials' };
      }

      const isMatch = await bcryptPass.compare(password, user.password);
      if (!isMatch) {
        return { err_msg: 'Invalid Credentials' };
      }

      const payload = {
        sub: user.register_no,
        role: Role.Student,
      };

      const accessToken = token.sign(payload);
      const refreshToken = token.refresh.sign(payload);

      return { accessToken, refreshToken };
    } catch (err) {
      console.log(`${this.className} --> login`);
      throw new Error(err.message);
    }
  }

  async getAll() {
    try {
      const students = await Student.find();

      const studentRegisterNumbers = students.map((item) => item.register_no);

      const studentWithDetails = await Promise.all(
        studentRegisterNumbers.map(this.getOne)
      );

      return studentWithDetails;
    } catch (err) {
      console.log(`${this.className} --> getAll`);
      throw new Error(err.message);
    }
  }

  async getOne(register_no) {
    try {
      const studentInfo = await Student.findById(register_no);
      if (!studentInfo) {
        return { err_msg: 'Student Not Found' };
      }

      let { password, course_id, ...resultObj } = studentInfo;

      if (course_id !== null) {
        const courseInfo = await Course.findById(course_id);
        if (courseInfo) {
          resultObj['course'] = courseInfo;
        }
      }

      // Retrieve Mark & Education in similar way
      const markInfo = await Mark.findById(register_no);

      resultObj['mark'] = markInfo;

      const educatonInfo = await Education.findById(register_no);

      resultObj['education'] = educatonInfo;

      return resultObj;
    } catch (err) {
      console.log(`${this.className} --> getOne`);
      throw new Error(err.message);
    }
  }

  async getAllCourses() {
    try {
      const courses = await Course.getAll();
      return courses;
    } catch (err) {
      console.log(`${this.className} --> getAllCourses`);
      throw new Error(err.message);
    }
  }

  async addMarks({ user, body }) {
    const { sub: register_no } = user;
    const { cgpa, active_backlog, backlog_history } = body;
    try {
      // todo: Update only if there is a difference
      const newMarks = {
        register_no,
        cgpa,
        active_backlog,
        backlog_history,
        updated_on: new Date(),
      };
      let marks = await Mark.findById(register_no);
      if (!marks) {
        marks = await Mark.add(newMarks);
      } else {
        marks = await Mark.update(newMarks);
      }
      return marks;
    } catch (err) {
      console.log(`${this.className} --> addMarks`);
      throw new Error(err.message);
    }
  }

  async addEducation({ user, body }) {
    const { sub: register_no } = user;
    const {
      tenth_board,
      tenth_percentage,
      twelfth_board,
      twelfth_percentage,
      grad_course,
      grad_percentage,
    } = body;
    try {
      // todo: Update only if there is a difference
      const newEducation = {
        register_no,
        tenth_board,
        tenth_percentage,
        twelfth_board,
        twelfth_percentage,
        grad_course,
        grad_percentage,
        updated_on: new Date(),
      };
      let education = await Education.findById(register_no);
      if (!education) {
        education = await Education.add(newEducation);
      } else {
        education = await Education.update(newEducation);
      }
      return education;
    } catch (err) {
      console.log(`${this.className} --> addEducation`);
      throw new Error(err.message);
    }
  }

  // todo: Change Password
  // todo: Reset/Forgot Password

  async updateStudent({ user, body }) {
    const { sub: register_no } = user;
    const { name, email, course_id } = body;
    try {
      const student = await Student.findById(register_no);

      let userFields = {
        name,
        email,
        course_id,
      };

      const course = course_id && (await Course.findById(course_id));
      if (!course) {
        userFields['course_id'] = undefined; // or null or ''
      }

      // todo: Refactor this
      Object.keys(userFields).forEach((key) => {
        if (!isDifferent(userFields[key], student[key])) {
          delete userFields[key];
        }
      });

      if (isEmptyObject(userFields)) {
        return { msg: 'No Changes' };
      }

      userFields['updated_on'] = new Date();

      const updateStud = await Student.update(register_no, userFields);

      return updateStud;
    } catch (err) {
      console.log(`${this.className} --> updateStudent`);
      throw new Error(err.message);
    }
  }

  //? Reducing DB Calls
  _getListingWithEligibility = (student, listing) => {
    const studentProps = {
      tenth_percentage: student.education.tenth_percentage,
      twelfth_percentage: student.education.twelfth_percentage,
      grad_percentage: student.education.grad_percentage,
      cgpa: student.mark.cgpa,
      active_backlog: student.mark.active_backlog,
      backlog_history: student.mark.backlog_history,
    };
    const listingProps = {
      tenth_percentage: listing.tenth_percentage,
      twelfth_percentage: listing.twelfth_percentage,
      grad_percentage: listing.grad_percentage,
      cgpa: listing.cgpa,
      active_backlog: listing.active_backlog,
      backlog_history: listing.backlog_history,
    };

    Object.keys(listingProps).forEach((key) => {
      if (listingProps[key] === undefined || listingProps[key] === null) {
        delete listingProps[key];
      }
    });
    Object.keys(studentProps).forEach((key) => {
      if (
        studentProps[key] === undefined ||
        studentProps[key] === null ||
        !listingProps.hasOwnProperty(key)
      ) {
        delete studentProps[key];
      }
    });

    const eligibility = {
      tenth_percentage:
        studentProps.tenth_percentage >= listingProps.tenth_percentage,
      twelfth_percentage:
        studentProps.twelfth_percentage >= listingProps.twelfth_percentage,
      grad_percentage:
        studentProps.grad_percentage >= listingProps.grad_percentage,
      cgpa: studentProps.cgpa >= listingProps.cgpa,
      active_backlog:
        studentProps.active_backlog <= listingProps.active_backlog,
      backlog_history:
        studentProps.backlog_history <= listingProps.backlog_history,
    };
    Object.keys(eligibility).forEach((key) => {
      if (!listingProps.hasOwnProperty(key)) {
        delete eligibility[key];
      }
    });

    const newListing = {
      ...listing,
      eligible: Object.values(eligibility).every((item) => item),
    };

    return newListing;
  };

  getOneListing = async (register_no, list_id) => {
    try {
      //! Using the service existing in the same class
      const student = await this.getOne(register_no);
      if (student.err_msg) {
        return student.err_msg;
      }
      const listing = await Listing.findById(list_id);
      if (!listing) {
        return { err_msg: 'Listing Not Found' };
      }

      const newListing = this._getListingWithEligibility(student, listing);

      return newListing;
    } catch (err) {
      console.log(`${this.className} --> getOneListing`);
      throw new Error(err.message);
    }
  };

  getListings = async (register_no) => {
    try {
      //! Using the service existing in the same class
      const student = await this.getOne(register_no);
      if (student.err_msg) {
        return student.err_msg;
      }

      // todo: Get Only list ID
      const listings = await Listing.find();
      if (listings.length < 1) {
        return { err_msg: 'No Listings Available' };
      }
      const newListings = listings.map((listing) =>
        this._getListingWithEligibility(student, listing)
      );

      return newListings;
    } catch (err) {
      console.log(`${this.className} --> getListings`);
      throw new Error(err.message);
    }
  };
}

export default new StudentService();
