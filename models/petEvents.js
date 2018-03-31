module.exports = function(sequelize, Sequelize) {
 
    var Events = sequelize.define('events', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        date: {
            type: Sequelize.DATE,
            notEmpty: true
        },
 
        location: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        description: {
            type: Sequelize.TEXT
        },
 
        RSVP: {
            type: Sequelize.STRING
        },
 
       
    });

    Events.associate = function(models) {
    Events.belongsTo(models.USer, {
      foreignKey: {
        allowNull: false
      }
    });
  };
 
    return Events;
 
}