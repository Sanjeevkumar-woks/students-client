import React, { useState, useEffect } from "react";

const AddStudentModal = ({
  isOpen,
  toggleModal,
  addStudent,
  updateStudent,
  studentData,
  setStudentData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (studentData) {
      setFormData(studentData);
    } else {
      setFormData({
        name: "",
        age: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.age || isNaN(formData.age) || formData.age < 1) {
      newErrors.age = "Valid age is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (studentData) {
        updateStudent(studentData._id, formData);
      } else {
        addStudent(formData);
      }
      setFormData({
        name: "",
        age: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
      });
      setStudentData(null);
      toggleModal(); // Close the modal after successful submission
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none" }}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {studentData ? "Edit Student" : "Add Student"}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                setStudentData(null);
                toggleModal();
              }}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.age ? "is-invalid" : ""}`}
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
                {errors.age && (
                  <div className="invalid-feedback">{errors.age}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className={`form-control ${
                    errors.gender ? "is-invalid" : ""
                  }`}
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <div className="invalid-feedback">{errors.gender}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {studentData ? "Update" : "Add"} Student
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
