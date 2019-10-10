module.exports = function(sequelize, DataTypes) {
    var Review = sequelize.define('Review', {
        title: DataTypes.STRING,
        body: DataTypes.TEXT,
        score: DataTypes.FLOAT
        // add properites here
        // ex: name: DataTypes.STRING
    });

    Review.associate = function(models) {
        // add associations here
        // ex:Review.hasMany(models.BlogPost);
        Review.belongsTo(models.Host)
        Review.belongsToMany(models.Platform,{through:"ReviewPlatform"})
    };

    return Review;
};