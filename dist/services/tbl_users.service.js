"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _pgPool = _interopRequireDefault(require("../db_pool/pg_pool"));
const _messages = require("../constants/messages");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let tableUsersService = class tableUsersService {
    async findAllUsers() {
        try {
            const dataset = await this.pool.aquery(`
        SELECT * FROM tbl_users 
        ORDER BY id ASC
      `);
            return {
                statusCode: 200,
                message: _messages.message.success.ok,
                data: dataset.rows
            };
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                message: _messages.message.errors.internal
            };
        }
    }
    async findUserById(userId) {
        try {
            const dataset = await this.pool.aquery(`
        SELECT * FROM tbl_users
        WHERE id = ${userId}
      `);
            if (dataset.rows.length > 0) {
                return {
                    statusCode: 200,
                    message: _messages.message.success.ok,
                    data: dataset.rows
                };
            } else {
                return {
                    statusCode: 403,
                    message: _messages.message.errors.notFound
                };
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                message: _messages.message.errors.internal
            };
        }
    }
    async createUser(userProfile) {
        try {
            let querySQL = `
        INSERT INTO tbl_users (
          username,
          password,
          name,
          phone_number,
          role_id,
          station_id,
          created_at,
          updated_at,
          password_mobile_pos

        ) VALUES (
          '${userProfile.username}',
          '${userProfile.password}',
          '${userProfile.name}',
          '${userProfile.phone_number}',
          ${userProfile.role_id},
          ${userProfile.station_id},
          CURRENT_TIMESTAMP(6),
          ${null},
          '${userProfile.password_mobile_pos}'
      )`;
            await this.pool.aquery(querySQL);
            return {
                statusCode: 200,
                message: _messages.message.success.insert
            };
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                message: _messages.message.errors.internal
            };
        }
    }
    async updateUser(userId, changesAsString) {
        try {
            let querySQL = `
        UPDATE tbl_users
        SET ${changesAsString}
        WHERE id = ${userId}
      `;
            await this.pool.aquery(querySQL);
            return {
                statusCode: 200,
                message: _messages.message.success.update
            };
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                message: _messages.message.errors.internal
            };
        }
    }
    async deleteUser(userId) {
        const response = await this.findUserById(userId);
        if (response.statusCode == 403) {
            return {
                statusCode: 403,
                message: _messages.message.errors.notFound
            };
        }
        try {
            let querySQL = `
        DELETE FROM tbl_users
        WHERE id = ${userId}
      `;
            await this.pool.aquery(querySQL);
            return {
                statusCode: 200,
                message: _messages.message.success.delete
            };
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                message: _messages.message.errors.internal
            };
        }
    }
    async conflictUpdateCheck(id, changes) {
        const response = await this.findUserById(id);
        if (response.statusCode == 403) {
            return {
                statusCode: 403,
                message: _messages.message.errors.notFound
            };
        }
        let userProfile = response.data[0];
        if (changes.username != null || changes.role_id != null || changes.station_id != null) {
            userProfile.username = changes.username == null ? userProfile.username : changes.username;
            userProfile.role_id = changes.role_id == null ? userProfile.role_id : changes.role_id;
            userProfile.station_id = changes.station_id == null ? userProfile.station_id : changes.staion_id;
            return this.duplicateAddCheck(userProfile);
        }
        return null;
    }
    async duplicateAddCheck(userProfile) {
        if (userProfile.role_id == 1) {
            const duplicateCheck = await this.pool.aquery(`
          SELECT count(username) FROM tbl_users
          WHERE username = '${userProfile.username}' AND
          role_id = 1 AND
          station_id = ${userProfile.station_id}
      `);
            if (duplicateCheck.rows[0].count > 0) {
                return {
                    statusCode: 500,
                    message: `cashier username already exists in the 'station ${userProfile.station_id}'`
                };
            }
        } else {
            const duplicateCheck1 = await this.pool.aquery(`
            SELECT count(username) FROM tbl_users
            WHERE username = '${userProfile.username}' AND
            role_id != 1
        `);
            if (duplicateCheck1.rows[0].count > 0) {
                return {
                    statusCode: 500,
                    message: `That moderator's username is already exists'`
                };
            }
        }
        return null;
    }
    constructor(){
        this.pool = new _pgPool.default();
    }
};
const _default = tableUsersService;

//# sourceMappingURL=tbl_users.service.js.map