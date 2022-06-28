'use strict';
module.exports = (sequelize, DataTypes) => {
  const RSVP = sequelize.define('RSVP', {
    rsvpListId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'rsvpLists' } },
    eventId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Events' } },
    pending: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {});
  RSVP.associate = function (models) {
    // associations can be defined here
  };
  return RSVP;
};
