module.exports = (sequelize, Sequelize) => {
    const AccessToken = sequelize.define("AccessToken", {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        client_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        token: {     
            type: Sequelize.STRING(1000),
       
        },
        expires_at: {
            type: Sequelize.DATE,
            allowNull: false
        },
        ip_addess: {
            type: Sequelize.STRING,
        }
    });

    return AccessToken;
};