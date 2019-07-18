module.exports = function(sequelize, DataTypes) {
    var BlogPost = sequelize.define("BlogPost", {
      // Giving the BlogPost model a name of type STRING
      name: DataTypes.STRING
    });
  
    BlogPost.associate = function(models) {
    //   // Associating BlogPost with Posts
    //   // When an BlogPost is deleted, also delete any associated Posts
      BlogPost.belongsTo(models.Host);
    };
  
    return BlogPost;
  };
  