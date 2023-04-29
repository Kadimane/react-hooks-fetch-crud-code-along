import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then((res) => res.json())
    .then((items) => {
      setItems(items)
    })
    .catch((err) => console.log(err))
  }, []);

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if(item.id === updatedItem.id){
        return updatedItem;
      }
      return item;
    })
    setItems(updatedItems)
  }

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  function handleAddItem(newItem){
    setItems([...items, newItem])
  }

  // console.log(items)

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {
          items.map((item) => (
            <Item 
              key={item.id} 
              item={item} 
              onUpdateItem={handleUpdateItem}
              onDeleteItem={handleDeleteItem} 
            />
          ))
        }
      </ul>
    </div>
  );
}

export default ShoppingList;
