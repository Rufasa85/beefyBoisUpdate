module.exports = function(sequelize, DataTypes) {
    var BlogPost = sequelize.define("BlogPost", {
      // Giving the BlogPost model a name of type STRING
      title: DataTypes.STRING,
      body: DataTypes.TEXT
    });
  
    BlogPost.associate = function(models) {
    //   // Associating BlogPost with Posts
    //   // When an BlogPost is deleted, also delete any associated Posts
      BlogPost.belongsTo(models.Host);
    };
  
    return BlogPost;
  };
  