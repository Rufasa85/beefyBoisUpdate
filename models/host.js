const bcrypt=require('bcrypt');
module.exports = function(sequelize, DataTypes) {
    var Host = sequelize.define("Host", {
      // Giving the Host model a name of type STRING
      name: {
        type:DataTypes.STRING,
        unique:true
      },
      password: DataTypes.STRING
    });
  
    Host.associate = function(models) {
    //   // Associating Host with Posts
    //   // When an Host is deleted, also delete any associated Posts
      Host.hasMany(models.BlogPost);
      Host.hasMany(models.Review);
      Host.belongsToMany(models.Episode,{through:"HostEpisode"});
    };
    
    Host.beforeCreate(function(host) {
      host.password = bcrypt.hashSync(host.password, bcrypt.genSaltSync(10), null);
    });
    return Host;
  };
  