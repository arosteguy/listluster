module.exports = function(sequelize, DataTypes) {
    var List = sequelize.define("List", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT
        },
        complete: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })


    return List;
    
};