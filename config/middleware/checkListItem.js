module.exports = function(sequelize, DataTypes) {
    var CheckListItem = sequelize.define("CheckListItem", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        complete: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
       }
});
return CheckListItem;
};