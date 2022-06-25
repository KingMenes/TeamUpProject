'use strict';
module.exports = (sequelize, DataTypes) => {
  const RSVP = sequelize.define('RSVP', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    eventId: { type: DataTypes.INTEGER, allowNull: false },
    pending: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {});
  RSVP.associate = function (models) {
    // associations can be defined here
  };
  return RSVP;
};
