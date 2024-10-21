const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 vh-100 vw-100"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", zIndex: 9999 }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
