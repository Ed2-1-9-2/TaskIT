const { Sequelize, DataTypes } = require('sequelize');

const database = new Sequelize('targ_db', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
});

const donationDb = database.define('donation', {
    Id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    donationType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    donationDescription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    donationValue: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

function resetDatabase() {
    return database.sync({ force: true });
}

function insertDonation(donation) {
    return donationDb.create(donation, { returning: true });
}

module.exports = { resetDatabase, insertDonation };
