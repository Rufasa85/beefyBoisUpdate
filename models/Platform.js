module.exports = function(sequelize, DataTypes) {
    var Platform = sequelize.define('Platform', {
        // add properites here
        name: DataTypes.STRING
    });

    Platform.associate = function(models) {
        // add associations here
        // ex:Platform.hasMany(models.BlogPost);
        Platform.belongsToMany(models.Review,{through:"ReviewPlatform"})
    };

    return Platform;
};