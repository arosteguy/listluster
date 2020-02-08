module.exports = function(sequelize, DataTypes) {
    const Item = sequelize.define("Item", {
        text: {
            type: DataTypes.TEXT
        },
        complete: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    Item.associate = function(models) {
        Item.belongsTo(models.List, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Item;
}