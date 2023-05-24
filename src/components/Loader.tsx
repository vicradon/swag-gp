import { TailSpin } from "react-loader-spinner";

type LoaderProps = {
  loading: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
};

const Loader = ({
  loading = false,
  width = 50,
  height = 50,
  className = "",
}: LoaderProps) => {
  return loading ? (
    <TailSpin
      wrapperClass={`${className} text-primary`}
      height={height}
      width={width}
    />
  ) : null;
};

export default Loader;
