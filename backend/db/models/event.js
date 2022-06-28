'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users' } },
    title: { type: DataTypes.STRING(50), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    date: DataTypes.DATEONLY,
    image: DataTypes.STRING
  }, {});
  Event.associate = function (models) {
    // associations can be defined here
    Event.belongsTo(models.User, { foreignKey: 'userId' })
    const columnMapping = { through: 'RSVP', otherKey: 'rsvpListId', foreignKey: 'eventId' }
    Event.belongsToMany(models.rsvpList, columnMapping)
  };
  return Event;
};
