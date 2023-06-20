
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            autoIncrement: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed'),
            defaultValue: 'pending',
        },
        invoiceNumber: DataTypes.STRING,
    });

    Order.associate = models => {
        Order.belongsTo(models.User);
        Order.hasMany(models.Product);
    };

    return Order;
};

  //belongs to
//   Order.belongsTo(models.Customer);
//   Order.hasMany(models.Product);