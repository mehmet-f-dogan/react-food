import { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RecipeItem from "./components/RecipeItem";
import Favorites from "./components/Favorites";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emptyArray, setEmptyArray] = useState("");
  const [stable, setStable] = useState(
    ""
  );
  const [savedItems, setSavedItems] = useState(() => {
    const localData = localStorage.getItem("recipes");
    return localData ? JSON.parse(localData) : [];
  });
  const [saveCount, setSaveCount] = useState(() => {
    return savedItems.length;
  });

  const navigator = useNavigate();

  const inputField = useRef();

  const searchHandler = (e) => {
    e.preventDefault();

    inputField.current.blur();

    navigator("/");

    setIsLoading(true);
    setRecipes([]);
    setErrorMsg("");
    setEmptyArray("");
    setStable("");

    setTimeout(() => {
      fetch(`${import.meta.env.VITE_API_URL}/recipes?search=${searchQuery}`)
        .then((res) => {
          if (!res.ok) throw new Error("Something went wrong!");
          return res.json();
        })
        .then((data) => {
          if (data.data.recipes.length === 0)
            setEmptyArray("No recipes found!");
          setRecipes(data.data.recipes);
          setIsLoading(false);
        })
        .catch((err) => setErrorMsg(err.message));
    }, 500);

    setSearchQuery("");
  };

  const checkLocalData = (data) => {
    const localData = JSON.parse(localStorage.getItem("recipes"));
    const dataExistance = localData.some((local) => local.id === data.id);

    if (!dataExistance) {
      setSavedItems((prevState) => [...prevState, data]);
    } else {
      const filteredLocalData = localData.filter(
        (local) => local.id !== data.id
      );
      setSavedItems(filteredLocalData);
    }
  };

  const saveHandler = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => checkLocalData(data.data.recipe));

    navigator("favorites");
  };

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(savedItems));
    setSaveCount(savedItems.length);
  }, [savedItems]);

  return (
    <>
      <div className="bg-gray-900 text-white text-lg min-h-screen">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchHandler={searchHandler}
          inputField={inputField}
          saveCount={saveCount}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                recipes={recipes}
                isLoading={isLoading}
                errorMsg={errorMsg}
                searchQuery={searchQuery}
                emptyArray={emptyArray}
                stable={stable}
              />
            }
          />
          <Route
            path="recipe-item/:id"
            element={
              <RecipeItem saveHandler={saveHandler} savedItems={savedItems} />
            }
          />
          <Route
            path="favorites/recipe-item/:id"
            element={
              <RecipeItem saveHandler={saveHandler} savedItems={savedItems} />
            }
          />
          <Route
            path="favorites"
            element={<Favorites savedItems={savedItems} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
