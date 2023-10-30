const { Sequelize, DataTypes } = require("sequelize");

const database = new Sequelize("targ_db", "root", "", {
  dialect: "mysql",
  host: "localhost",
  logging: false,
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
    timestamps: true,
  },
});


const donatorDb = database.define("donator", {
    Id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
  });
  
  const donationDb = database.define("donation",
    {
      Id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      donationType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      donationDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      donationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      value: {
        type: DataTypes.FLOAT, 
        allowNull: true,
      },
    }
  );
  
  donatorDb.hasMany(donationDb);