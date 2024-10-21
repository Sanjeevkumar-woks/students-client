import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StudentServer } from "../servers/studentServer";

const StudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [marks, setMarks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const response = await StudentServer.getStudentById(id);
      setStudent(response.student);
      setMarks(response.marks);
      setLoading(false);
    };
    fetchStudent();
  }, []);

  return (
    <div className="container mt-5">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          <h2 className="mb-4 fw-bold font-monospace text-3xl">Profile</h2>

          {/* Student Details Section */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                <strong>Name: {student.name}</strong>
              </h5>
              <p className="card-text">
                <strong>Age:</strong>
                {student.age}
              </p>
              <p className="card-text">
                <strong>Gender:</strong> {student.gender}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {student.email}
              </p>
              <p className="card-text">
                <strong>Phone:</strong> {student.phone}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {student.address}
              </p>
              <p className="card-text text-muted">
                <small>
                  Profile created on:{" "}
                  {new Date(student.createdAt).toLocaleDateString()}
                </small>
              </p>
            </div>
          </div>

          {/* Marks Section */}
          <h2 className="mb-4 fw-bold font-monospace text-3xl">Marks</h2>
          <div className="card">
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {marks[0]?.subjects.map((subject) => (
                    <tr key={subject._id}>
                      <td>{subject.subject}</td>
                      <td>{subject.marks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
