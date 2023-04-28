import { Link } from "react-router-dom";
import FryingPan from "./FryingPan";

const NotFound = () => {
  return (
    <div className="container mx-auto py-8 flex flex-col items-center gap-5">
      <p className="text-2xl lg:text-4xl text-center font-semibold leading-normal">
        Page not found!
      </p>
      <FryingPan />
    </div>
  );
};

export default NotFound;
