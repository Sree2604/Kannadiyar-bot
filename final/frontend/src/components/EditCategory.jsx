import React, { useState, useEffect } from "react";
// import Dropdown from "react-multilevel-dropdown";
import NavBar from "./NavBar";

const EditCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesFromServer();
  }, []);

  const getCategoriesFromServer = async () => {
    try {
      const res = await fetch(`http://localhost:4000/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEditCategory = async (categoryId, editedCategory) => {
    try {
      const updatedCategories = [...categories];
      updatedCategories[categoryId].category = editedCategory.trim();
      setCategories(updatedCategories);

      await updateCategoryOnServer(updatedCategories[categoryId].id, {
        category: editedCategory.trim(),
        sub_category: updatedCategories[categoryId].sub_category,
      });
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleEditSubcategory = async (
    categoryId,
    subcategoryIndex,
    editedSubcategory
  ) => {
    try {
      const updatedCategories = [...categories];
      updatedCategories[categoryId].sub_category[subcategoryIndex] =
        editedSubcategory.trim();
      setCategories(updatedCategories);

      await updateSubcategoryOnServer(updatedCategories[categoryId].id, {
        category: updatedCategories[categoryId].category,
        sub_category: updatedCategories[categoryId].sub_category,
      });
    } catch (error) {
      console.error("Error editing subcategory:", error);
    }
  };

  const updateCategoryOnServer = async (categoryId, updatedCategory) => {
    try {
      console.log(updatedCategory);
      const response = await fetch(
        `http://localhost:4000/subCategory/?cId=${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCategory),
        }
      );
      console.log("Category updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const updateSubcategoryOnServer = async (
    categoryId,
    updatedSubcategories
  ) => {
    try {
      const response = await fetch(
        `http://localhost:4000/subCategory/?cId=${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSubcategories),
        }
      );
      console.log("Subcategory updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(
       ` http://localhost:4000/categories/${categoryId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedCategories = categories.filter(
          (category) => category.id !== categoryId
        );
        setCategories(updatedCategories);
        console.log("Category deleted successfully");
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDeleteSubcategory = async (categoryId, subcategoryIndex) => {
    console.log()
    try {
      const subCategory = categories[categoryId].sub_category[subcategoryIndex]
      const catId = categories[categoryId].id
      console.log(catId)
      const response = await fetch(
        `http://localhost:4000/categories/${catId}/subcategories/${subCategory}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedCategories = [...categories];
        updatedCategories[categoryId].sub_category.splice(subcategoryIndex, 1);
        setCategories(updatedCategories);
        console.log("Subcategory deleted successfully");
      } else {
        console.error("Failed to delete subcategory");
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  return (
    <>
    <NavBar/>
    <div className="flex justify-center font-content flex-col">
      <h1 className="text-xl text-center mb-6 font-semibold font-content text-primecolor mt-2">Edit your Category</h1>
      <table className="border border-primecolor">
        <thead className="border border-primecolor">
          <tr className="pr-44 bg-orange-100 text-primecolor">
            <th className="pr-44 border-r-primecolor border-r ">Category</th>
            <th className="pr-44 border-r-primecolor border-r ">Subcategory</th>
            <th className="pr-44 border-r-primecolor border-r text-center">Edit</th>
            <th className="pr-44 text-center">Delete</th>
          </tr>
        </thead>
        <tbody className="border border-primecolor   ">
          {categories.map((category, categoryIndex) => (
            <React.Fragment key={category.id}>
              <tr className="border border-primecolor bg-orange-100 border-r-primecolor border-r">
                <td className="border-r-primecolor border-r">{category.category}</td>
                <td className="border-r-primecolor border-r"></td>
                <td className="border-r-primecolor border-r">
                  <button
                    className=" "
                    onClick={() => {
                      const editedCategory = prompt(
                        "Enter the updated category name:",
                        category.category
                      );
                      if (editedCategory !== null) {
                        if (editedCategory.trim() !== "") {
                          handleEditCategory(categoryIndex, editedCategory);
                        } else {
                          alert("Category name cannot be empty.");
                        }
                      } else {
                        console.log("Edit operation canceled by the user.");
                      }
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td className="border-r-primecolor border-r">
                  <button
                  className=" "
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this category?"
                        )
                      ) {
                        handleDeleteCategory(category.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              {category.sub_category.map((subcategory, subcategoryIndex) => (
                <tr key={subcategoryIndex}>
                  <td className="border-r-primecolor border-r"></td>
                  <td className="border-r-primecolor border-r">{subcategory}</td>
                  <td className="border-r-primecolor border-r">
                    <button
                    className=" "
                      onClick={() => {
                        const editedSubcategory = prompt(
                          "Enter the updated subcategory name:",
                          subcategory
                        );
                        if (editedSubcategory !== null) {
                          if (editedSubcategory.trim() !== "") {
                            handleEditSubcategory(
                              categoryIndex,
                              subcategoryIndex,
                              editedSubcategory
                            );
                          } else {
                            alert("Subcategory name cannot be empty.");
                          }
                        } else {
                          console.log("Edit operation canceled by the user.");
                        }
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                    className=""
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this subcategory?"
                          )
                        ) {
                          handleDeleteSubcategory(
                            categoryIndex,
                            subcategoryIndex
                          );
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default EditCategory;