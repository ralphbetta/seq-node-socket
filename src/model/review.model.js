

module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("Review", {
        rating: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.TEXT
        }
    })

    return Review

}