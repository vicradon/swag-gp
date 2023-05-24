import { TailSpin } from "react-loader-spinner";
import "./style.css";

interface Props {
  type?: string;
  color?: string;
  height?: number;
  width?: number;
  text?: string;
}

export default function GlobalLoader(props: Props) {
  return (
    <div className="main_loader">
      <div className="overlay"></div>
      <div className="content">
        <TailSpin
          color={props.color || "#1E4A86"}
          height={props.height || 60}
          width={props.width || 60}
        />
        <div className="loading-text">{props.text}</div>
      </div>
    </div>
  );
}
