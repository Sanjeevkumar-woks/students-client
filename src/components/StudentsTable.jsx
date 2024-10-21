import { useEffect, useState } from "react";
import useStudentsTable from "../hooks/useStudentsTable";
import AddStudentModal from "./AddEditStudent";
import Loader from "./Loader";

const StudentsTable = () => {
  const [studentData, setStudentData] = useState(null);
  const {
    students,
    loading,
    error,
    page,
    totalStudents,
    handlePageChange,
    viewStudent,
    totalPages,
    deleteStudent,
    handleLimitChange,
    setPage,
    limit,
    isModalOpen,
    setIsModalOpen,
    addStudent,
    updateStudent,
  } = useStudentsTable();

  return (
    <div>
      {loading && <Loader />}
      {error && (
        <div className="alert alert-danger">Error: {error.message}</div>
      )}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0 fw-bold font-monospace text-3xl">Students Table</h1>
        <p className="mb-0 text-muted ">Total Students: {totalStudents}</p>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen((pre) => !pre)}
        >
          Add Student
        </button>
      </div>
      {isModalOpen && (
        <AddStudentModal
          isOpen={isModalOpen}
          toggleModal={() => setIsModalOpen((pre) => !pre)}
          addStudent={addStudent}
          updateStudent={updateStudent}
          studentData={studentData}
          setStudentData={setStudentData}
        />
      )}
      <div className="table-responsive">
        <table className="table table-dark table-striped table-sm">
          <thead>
            <tr>
              <th>Name </th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id}>
                  <td
                    onClick={() => viewStudent(student._id)}
                    className="hover:cursor-pointer"
                  >
                    {student.name}
                  </td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.address}</td>
                  <td className="d-flex gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setStudentData(student);
                        setIsModalOpen((pre) => !pre);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation" className="mt-3">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${page === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </li>
          <li className="page-item">
            <select
              className="form-select"
              value={limit}
              onChange={(e) => handleLimitChange(e.target.value)}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StudentsTable;
