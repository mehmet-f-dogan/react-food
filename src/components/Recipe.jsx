import { Link } from "react-router-dom";

const Recipe = ({ recipe }) => {
  return (
    <div
      key={recipe.id}
      className="w-80 overflow-hidden  bg-gray-950  border-2 border-white p-5"
    >
      <div className="overflow-hidden  h-40 flex justify-center items-center">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className=" w-full block"
        />
      </div>
      <div className="pt-5 flex flex-col">
        <p className="text-xs uppercase font-semibold tracking-widest">
          {recipe.publisher}
        </p>
        <h2 className="text-2xl capitalize truncate font-medium">
          {recipe.title}
        </h2>
        <Link
          to={`recipe-item/${recipe.id}`}
          className="bg-gray-800 self-start text-sm uppercase font-medium tracking-wider p-3 px-8  mt-2 duration-300"
        >
          View recipe
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
