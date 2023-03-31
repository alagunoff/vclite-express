const { DataTypes } = require('sequelize')

const db = require('../configs/db')
const validators = require('../shared/validators')

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      arg: true,
      msg: 'already taken'
    },
    validate: {
      notNull: {
        msg: 'cannot be empty'
      },
      isNotEmptyString: validators.isNotEmptyString
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'cannot be empty'
      },
      isNotEmptyString: validators.isNotEmptyString
    }
  },
  first_name: {
    type: DataTypes.STRING,
    validate: {
      isNotEmptyString: validators.isNotEmptyString
    }
  },
  last_name: {
    type: DataTypes.STRING,
    validate: {
      isNotEmptyString: validators.isNotEmptyString
    }
  },
  image: {
    type: DataTypes.STRING,
    validate: {
      isBase64Image: validators.isBase64Image
    }
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    validate: {
      isBoolean: validators.isBoolean
    }
  }
}, {
  updatedAt: false,
  createdAt: 'created_at'
})

module.exports = User
