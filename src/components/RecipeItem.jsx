import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsPerson, BsClock } from "react-icons/bs";
import { GiKnifeFork } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import { CgSpinner } from "react-icons/cg";

const RecipeItem = ({ saveHandler, savedItems }) => {
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasBeenSaved, setHasBeenSaved] = useState(null);

  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setErrorMsg("");
    setRecipe("");

    setTimeout(() => {
      fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Something went wrong!");
          return res.json();
        })
        .then((data) => {
          setRecipe(data.data.recipe);
          setIsLoading(false);
        })
        .catch((err) => setErrorMsg(err.message));
    }, 500);
  }, []);

  const timeFormatter = (time) => {
    if (!time) return;

    if (!String(time).includes(".")) {
      return time + "h";
    }

    if (String(time).includes(".")) {
      return String(time).replace(".", "h") + "min";
    }
  };

  useEffect(() => {
    if (!recipe) return;
    setHasBeenSaved(savedItems.some((item) => item.id === recipe.id));
  }, [recipe]);

  return (
    <>
      {isLoading && (
        <p className="text-2xl container mx-auto py-8 text-center">
          {errorMsg ? (
            errorMsg
          ) : (
            <CgSpinner className="animate-spin text-center inline-block" />
          )}
        </p>
      )}

      {recipe && (
        <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 px-5 lg:px-0">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5 flex-col  items-start lg:flex-row">
              <button
                onClick={() => navigator(-1)}
                className="bg-rose-500  p-3 px-8 uppercase hover:bg-gray-600   duration-300"
              >
                Back
              </button>
              <a
                href={recipe.source_url}
                target="_blank"
                className="bg-sky-400 p-3 px-8  uppercase hover:bg-gray-600   duration-300"
              >
                Instructions
              </a>
              <button
                className={`p-3  px-8  uppercase tracking-wider duration-300 ${
                  hasBeenSaved
                    ? " bg-red-700 hover:bg-white hover:text-black"
                    : " bg-lime-700 hover:bg-white hover:text-black "
                }`}
                onClick={() => saveHandler(recipe.id)}
              >
                {hasBeenSaved ? "Remove" : "Save"}
              </button>
            </div>
            <p className="uppercase font-semibold tracking-wider ">
              {recipe.publisher}
            </p>
            <h2 className="text-4xl lg:text-6xl capitalize">{recipe.title}</h2>
            <div className="flex justify-between flex-col lg:flex-row gap-3">
              <p className="uppercase font-semibold tracking-wider  flex items-center gap-2">
                <BsPerson /> Serving(s): <span>{recipe.servings}</span>
              </p>
              <p className="uppercase font-semibold tracking-wider flex items-center gap-2">
                {" "}
                <BsClock />
                Duration:{" "}
                <span>
                  {recipe.cooking_time < 60
                    ? String(recipe.cooking_time) + "min"
                    : timeFormatter(recipe.cooking_time / 60)}
                </span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden flex justify-center items-center lg:h-96">
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="w-full block  hover:scale-105 duration-300"
            />
          </div>
          <div className="col-span-full">
            <h2 className="text-2xl lg:text-4xl flex items-center gap-3 font-medium mb-5">
              <span>
                <GiKnifeFork />
              </span>{" "}
              Ingredients:
            </h2>
            <hr className="border-rose-100" />
            <div className="mt-5">
              {recipe.ingredients &&
                recipe.ingredients.map((ing) => (
                  <p
                    className="leading-loose"
                    key={Math.floor(Math.random() * 100000000)}
                  >
                    <TiTick className="inline-block" />
                    <span>
                      {ing.quantity && ing.quantity}
                      {ing.unit && ing.unit}{" "}
                      {ing.description && ing.description}
                    </span>{" "}
                  </p>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeItem;
