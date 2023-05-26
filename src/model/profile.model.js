
module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define(
        "Profile",
        {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                autoIncrement: false,
            },
            full_name: {
                type: Sequelize.STRING,
                allowNull: true
            },

            address: {
                type: Sequelize.STRING,
                allowNull: true
            },
            phone_number: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    isNumeric: true
                }
            }
        },
        { timestamps: true }
    );
    return Profile;
};
