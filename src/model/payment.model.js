
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      paymentDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false
      }

    });

    return Payment;
}

//has one
//Payment.belongsTo(Order);
//or
// Payment.hasOne(models.Order);


