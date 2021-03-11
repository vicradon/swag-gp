import { Spinner } from "react-bootstrap";

function PulsatingSpinner({ loading }) {
  return (
    loading && (
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
        className="mr-2"
      />
    )
  );
}

export default PulsatingSpinner;
