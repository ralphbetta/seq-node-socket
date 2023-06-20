
module.exports = (sequelize, Sequelize) => {
    // Define the User model


    const Product = sequelize.define("Product", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        image: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.TEXT
        },
        published: {
            type: Sequelize.BOOLEAN
        }

    })

    return Product

}

