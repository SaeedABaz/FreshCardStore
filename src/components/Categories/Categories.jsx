import { useState, useEffect } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // Store category name
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );
        setCategories(response.data.data);
      } catch (error) {
        setError("Error fetching categories");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  async function fetchSubcategories(categoryId, categoryName) {
    setSelectedCategory(categoryId);
    setSelectedCategoryName(categoryName); // Set category name
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      );
      setSubcategories(response.data.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-12 gap-4 mt-7">
      {/* Categories List */}
      <ul className="col-span-12 flex flex-wrap gap-10 justify-center">
        {categories.map((category) => (
          <li
            key={category._id}
            className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] xl:w-[19%] shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-green-500 hover:shadow-lg cursor-pointer"
            onClick={() => fetchSubcategories(category._id, category.name)} // Pass category name
          >
            <img
              className="w-full h-60 object-cover"
              src={category.image}
              alt={category.name}
            />
            <h3 className="text-green-500 text-center py-3">{category.name}</h3>
          </li>
        ))}
      </ul>

      {/* Subcategories List */}
      {selectedCategory && (
        <div className="col-span-12 mt-10">
          <h2 className="text-xl font-bold text-center mb-4 text-green-600">
            {selectedCategoryName} Subcategories
          </h2>
          <ul className="flex flex-wrap gap-6 justify-center">
            {subcategories.length > 0 ? (
              subcategories.map((subcategory) => (
                <li
                  key={subcategory._id}
                  className="bg-gray-100 px-4 py-2 rounded-md shadow-md text-center"
                >
                  {subcategory.name}
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No subcategories found</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
