module.exports = (sequelize, Sequelize) => {
    const AccessToken = sequelize.define("accessToken", {
        user_id : {
            type: Sequelize.INTEGER,
            allowNull : false
        },
        client_id : {
            type : Sequelize.STRING,
            allowNull : false
        },
        token : {
            type: Sequelize.STRING(10000),
            unique : true,
            allowNull : false
        },
        expires_at : {
            type: Sequelize.DATE,
            allowNull : false
        },        
    });
  
    return AccessToken;
  };