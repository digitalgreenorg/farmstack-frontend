import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
// import { Delete, Edit } from "@material-ui/icons";
import styles from "./categories.module.css"; // Import the CSS file
import { getTokenLocal } from "../../Utils/Common";
import { RiDeleteBin6Line } from "react-icons/fi";
import { RiDeleteBin3Line } from "react-icons/ri";

const CategoriesComponent = ({
  allCategories,
  handleAddNewSubcategory,
  handleUpdateCategory,
  handleDeleteSubCategory,
}) => {
  // console.log("🚀 ~ CategoriesComponent ~ allCategories:", allCategories);
  const [categories, setCategories] = useState(allCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newSubcategory, setNewSubcategory] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const token = getTokenLocal();

  useEffect(() => {
    // const fetchCategories = async () => {
    //   try {
    //     const response = await fetch(
    //       "https://platform.farmer.chat/be/datahub/categories/",
    //       {
    //         method: "GET",
    //         headers: {
    //           Accept: "application/json, text/plain, */*",
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );

    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }

    //     const data = await response.json();
    //     setCategories(data);
    //     handleSelectCategory(data[0]);
    //   } catch (error) {
    //     console.error("Error fetching categories:", error);
    //   }
    // };

    // fetchCategories();
    allCategories.length > 0 && handleSelectCategory(allCategories[0]);
    setCategories(allCategories);
  }, [allCategories]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setEditCategory(category.name);
  };

  const handleEditCategoryName = () => {
    // setCategories(
    //   categories.map((category) =>
    //     category.id === selectedCategory.id
    //       ? { ...category, name: editCategory }
    //       : category
    //   )
    // );
    handleUpdateCategory(selectedCategory.id, editCategory);
    // setSelectedCategory({ ...selectedCategory, name: editCategory });
  };

  console.log(categories, "***12");
  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
    setSelectedCategory(null);
  };

  const handleAddSubcategory = () => {
    if (newSubcategory.trim()) {
      // const updatedCategory = {
      //   ...selectedCategory,
      //   subcategories: [
      //     ...selectedCategory.subcategories,
      //     { id: Date.now().toString(), name: newSubcategory },
      //   ],
      // };
      // setCategories(
      //   categories.map((category) =>
      //     category.id === selectedCategory.id ? updatedCategory : category
      //   )
      // );
      // sub category api call
      handleAddNewSubcategory(selectedCategory.id, newSubcategory);
      // setSelectedCategory(updatedCategory);
      setNewSubcategory("");
    }
  };

  const handleDeleteSubcat = (subcategoryId, subCategoryName) => {
    // const updatedCategory = {
    //   ...selectedCategory,
    //   subcategories: selectedCategory.subcategories.filter(
    //     (subcat) => subcat.id !== subcategoryId
    //   ),
    // };
    // setCategories(
    //   categories.map((category) =>
    //     category.id === selectedCategory.id ? updatedCategory : category
    //   )
    // );
    // setSelectedCategory(updatedCategory);
    handleDeleteSubCategory(subcategoryId, subCategoryName);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Typography variant="h5" gutterBottom>
          Main Categories
        </Typography>
        <List>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              button
              onClick={() => handleSelectCategory(category)}
              className={styles.category}
            >
              <ListItemText primary={category.name} />
              <IconButton
                onClick={() => handleDeleteCategory(category.id)}
                className={styles.deleteButton}
              >
                <RiDeleteBin3Line />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>
      <Paper className={styles.mainContent} elevation={3}>
        {selectedCategory ? (
          <>
            <div className={styles.categoryHeader}>
              <TextField
                label="Category Name"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                variant="outlined"
                fullWidth
                size="small"
              />
              <Button
                onClick={handleEditCategoryName}
                className={styles.addButton}
              >
                Save
              </Button>
            </div>
            <div className={styles.addSubcategoryForm}>
              <TextField
                label="Add Subcategory"
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
                variant="outlined"
                fullWidth
                size="small"
              />
              <Button
                onClick={handleAddSubcategory}
                className={styles.addButton}
              >
                Add
              </Button>
            </div>
            <div className={styles.subcategoryList}>
              <Typography variant="h6" gutterBottom>
                Subcategories
              </Typography>
              <List>
                {selectedCategory.subcategories.map((subcat) => (
                  <ListItem key={subcat.id}>
                    <ListItemText primary={subcat.name} />
                    <IconButton
                      onClick={() => handleDeleteSubcat(subcat.id, subcat.name)}
                      className={styles.deleteButton}
                    >
                      <RiDeleteBin3Line />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </div>
          </>
        ) : (
          <Typography variant="h6">
            Select a category to view and manage its subcategories.
          </Typography>
        )}
      </Paper>
    </div>
  );
};

export default CategoriesComponent;
