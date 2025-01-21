import { useState } from "react";

const Card = ({ id, name, description, ingredient, image, fav }) => {
  const [favorite, setFavorite] = useState(fav);
  const [textButton, setTextButton] = useState(
    fav ? "Quitar de favoritos" : "Agregar a favoritos"
  );

  const changeFav = async () => {
    const newRecipe = {
      id: id,
      name: name,
      description: description,
      ingredient: ingredient,
      image: image,
      fav: !favorite,
    };
    const response = fetch(`http://localhost:3001/recetas/${id}`, {
      method: "PUT",
      body: JSON.stringify(newRecipe),
    });
    const data = await response;
    console.log(data);
    handleFav();
  };

  const handleFav = () => {
    setFavorite(!favorite);
    setTextButton(favorite ? "Agregar a favoritos" : "Quitar de favoritos");
  };
  return (
    <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
      <a href={`/recetas/${id}`}>
        <img
          className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
          src={image}
          alt="comida"
        />
      </a>
      <div className="p-5">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          <a href="#">{name}</a>
        </h3>
        <span className="text-gray-500 dark:text-gray-400">{description}</span>
        <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
          {ingredient}
        </p>
        <button
          onClick={changeFav}
          className="mt-3 mb-4 font-bold text-red-500 dark:text-gray-400"
        >
          {textButton}
        </button>
      </div>
    </div>
  );
};
export default Card;
