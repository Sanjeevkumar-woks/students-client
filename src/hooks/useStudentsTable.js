import { useEffect, useState } from "react";
import { StudentServer } from "../servers/studentServer";
import { useNavigate } from "react-router-dom";

const useStudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalStudents, setTotalStudents] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    getAllStudents();
  }, [page, limit]);

  const getAllStudents = async () => {
    setLoading(true);

    try {
      const response = await StudentServer.getAllStudents(page, limit);
      setStudents(response.students);
      setTotalStudents(response.totalStudents);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    setLoading(true);
    try {
      await StudentServer.deleteStudent(id);
      getAllStudents();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (student) => {
    setLoading(true);

    try {
      await StudentServer.createStudent(student);
      getAllStudents();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (id, student) => {
    setLoading(true);

    try {
      await StudentServer.updateStudent(id, student);
      getAllStudents();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const viewStudent = (id) => {
    navigate(`/student/${id}`);
  };

  const totalPages = Math.ceil(totalStudents / limit);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  const handleLimitChange = (newLimit) => {
    if (newLimit > 0 && newLimit <= 100) {
      setLimit(newLimit);
    }
  };

  return {
    students,
    loading,
    error,
    page,
    limit,
    totalStudents,
    getAllStudents,
    deleteStudent,
    handlePageChange,
    totalPages,
    handleLimitChange,
    viewStudent,
    isModalOpen,
    setIsModalOpen,
    addStudent,
    updateStudent,
  };
};

export default useStudentsTable;
