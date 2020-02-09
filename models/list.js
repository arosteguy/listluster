module.exports = function(sequelize, DataTypes) {
    var List = sequelize.define("List", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    List.associate = function(models) {
        List.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })

        List.hasMany(models.Item, {
            onDelete: "CASCADE"
        })
    }

    return List;
    
};