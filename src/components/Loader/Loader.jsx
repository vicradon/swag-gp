import ReactLoader from "react-loader-spinner";

function Loader({ loading }) {
  return (
    loading && (
      <div className="d-flex justify-content-center py-3">
        <ReactLoader
          type="TailSpin"
          className="text-primary"
          height={50}
          width={50}
        />
      </div>
    )
  );
}

export default Loader;
