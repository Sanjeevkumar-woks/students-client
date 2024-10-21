import axios from "axios";

const BASE_URL = "https://students-service-yy68.onrender.com/api/students";
export class StudentServer {
  static GET_ALL_STUDENTS = "/getAllStudents";
  static GET_STUDENT_BY_ID = "/getStudentById/:id";
  static CREATE_STUDENT = "/createStudent";
  static CREATE_BULK_STUDENTS = "/createBulkStudents";
  static UPDATE_STUDENT = "/updateStudent";
  static DELETE_STUDENT = "/deleteStudent";

  static async getAllStudents(page, limit) {
    const response = await axios.get(
      `${BASE_URL}${StudentServer.GET_ALL_STUDENTS}?page=${page}&limit=${limit}`
    );
    return response.data;
  }
  static async getStudentById(id) {
    const response = await axios.get(
      `${BASE_URL}${StudentServer.GET_STUDENT_BY_ID.replace(":id", id)}`
    );
    return response.data;
  }
  static async createStudent(student) {
    const response = await axios.post(
      `${BASE_URL}${StudentServer.CREATE_STUDENT}`,
      student
    );
    return response.data;
  }

  static async updateStudent(id, student) {
    const { name, age, gender, email, phone, address } = student;
    const response = await axios.put(
      `${BASE_URL}${StudentServer.UPDATE_STUDENT}/${id}`,
      { name, age, gender, email, phone, address }
    );
    return response.data;
  }
  static async deleteStudent(id) {
    const response = await axios.delete(
      `${BASE_URL}${StudentServer.DELETE_STUDENT}/${id}`
    );
    return response.data;
  }
}
