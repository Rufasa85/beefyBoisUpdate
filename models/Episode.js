module.exports = function(sequelize, DataTypes) {
    var Episode = sequelize.define('Episode', {
        // add properites here
        // ex: name: DataTypes.STRING
        number: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        iframeurl:DataTypes.STRING
    });

    Episode.associate = function(models) {
        // add associations here
        // ex:Episode.hasMany(models.BlogPost);
        Episode.belongsToMany(models.Host,{through:"HostEpisode"})
    };

    return Episode;
};