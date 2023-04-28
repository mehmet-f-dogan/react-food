import Recipe from "./Recipe";

const Favorites = ({ savedItems }) => {
  return (
    <>
      <div className="text-2xl lg:text-4xl text-center font-semibold leading-normal py-8">
        {savedItems.length === 0 ? (
          <p>Your favorites list is empty!</p>
        ) : (
          <p>Your favorite recipe{savedItems.length !== 1 ? "s" : null}!</p>
        )}
      </div>
      <div className="container mx-auto py-8 flex flex-wrap gap-10 justify-center">
        {savedItems.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
};

export default Favorites;
