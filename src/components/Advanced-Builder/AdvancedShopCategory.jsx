const AdvancedShopCategory = ({ category, handleCategory }) => {
  return (
    <button key={category} onClick={() => handleCategory(category)}>
      {category}
    </button>
  );
};

export default AdvancedShopCategory;
