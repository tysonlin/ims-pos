module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: 'Category_id' } );
    Product.hasMany(models.Product_Ingredient, { foreignKey: 'Product_id' });
  };

  return Product;
};