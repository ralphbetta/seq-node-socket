

module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("Review", {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        rating: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.TEXT
        }
    })

    return Review

}