module.exports = function(sequelize, DataTypes) {
    var List = sequelize.define("List", {
        list_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        list_catagory: {
            type: DataTypes.STRING,
            defaultValue: "Default"
        },
        list_items: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })

    // }, {
    //     classMethods: {
    //         associate: function(models){
    //             list.hasOne(models.User);
    //         }
    //     }
    // });

    return List;
    
};