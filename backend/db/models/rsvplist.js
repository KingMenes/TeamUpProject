'use strict';
module.exports = (sequelize, DataTypes) => {
  const rsvpList = sequelize.define('rsvpList', {
    userId: DataTypes.INTEGER
  }, {});
  rsvpList.associate = function (models) {
    // associations can be defined here
    const columnMapping = { through: 'RSVP', otherKey: 'eventId', foreignKey: 'rsvpListId' }
    rsvpList.belongsToMany(models.Event, columnMapping)
  };
  return rsvpList;
};
