import ReactLoader from "react-loader-spinner";

function Loader({ loading }) {
  return (
    <div className="d-flex justify-content-center py-3">
      {loading && (
        <ReactLoader
          type="TailSpin"
          className="text-primary"
          height={50}
          width={50}
        />
      )}
    </div>
  );
}

export default Loader;
