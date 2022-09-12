"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pg_pool_1 = tslib_1.__importDefault(require("../db_pool/pg_pool"));
const messages_1 = require("../constants/messages");
class tableUsersService {
    constructor() {
        this.pool = new pg_pool_1.default();
    }
    async findAllUsers() {
        try {
            const dataset = await this.pool.aquery(`
        SELECT * FROM tbl_users 
        ORDER BY id ASC
      `);
            return { statusCode: 200, message: messages_1.message.success.ok, data: dataset.rows };
        }
        catch (error) {
            console.log(error);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async findUserById(userId) {
        try {
            const dataset = await this.pool.aquery(`
        SELECT * FROM tbl_users
        WHERE id = ${userId}
      `);
            if (dataset.rows.length > 0) {
                return { statusCode: 200, message: messages_1.message.success.ok, data: dataset.rows };
            }
            else {
                return { statusCode: 403, message: messages_1.message.errors.notFound };
            }
        }
        catch (error) {
            console.log(error);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async createUser(userProfile) {
        try {
            // ${userProfile.id},
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
            // console.log(querySQL)
            await this.pool.aquery(querySQL);
            return { statusCode: 200, message: messages_1.message.success.insert };
        }
        catch (error) {
            console.log(error);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async updateUser(userId, changesAsString) {
        try {
            let querySQL = `
        UPDATE tbl_users
        SET ${changesAsString}
        WHERE id = ${userId}
      `;
            // console.log(querySQL)
            await this.pool.aquery(querySQL);
            return { statusCode: 200, message: messages_1.message.success.update };
        }
        catch (error) {
            console.log(error);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async deleteUser(userId) {
        const response = await this.findUserById(userId);
        if (response.statusCode == 403) {
            return { statusCode: 403, message: messages_1.message.errors.notFound };
        }
        try {
            let querySQL = `
        DELETE FROM tbl_users
        WHERE id = ${userId}
      `;
            // console.log(querySQL)
            await this.pool.aquery(querySQL);
            return { statusCode: 200, message: messages_1.message.success.delete };
        }
        catch (error) {
            console.log(error);
            return { statusCode: 500, message: messages_1.message.errors.internal };
        }
    }
    async conflictUpdateCheck(id, changes) {
        const response = await this.findUserById(id);
        if (response.statusCode == 403) {
            return { statusCode: 403, message: messages_1.message.errors.notFound };
        }
        let userProfile = response.data[0];
        if (changes.username != null || changes.role_id != null || changes.station_id != null) {
            userProfile.username = changes.username == null ?
                userProfile.username : changes.username;
            userProfile.role_id = changes.role_id == null ?
                userProfile.role_id : changes.role_id;
            userProfile.station_id = changes.station_id == null ?
                userProfile.station_id : changes.staion_id;
            return this.duplicateAddCheck(userProfile);
        }
        return null;
    }
    async duplicateAddCheck(userProfile) {
        // add cashier
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
            // moderator
        }
        else {
            const duplicateCheck = await this.pool.aquery(`
            SELECT count(username) FROM tbl_users
            WHERE username = '${userProfile.username}' AND
            role_id != 1
        `);
            if (duplicateCheck.rows[0].count > 0) {
                return {
                    statusCode: 500,
                    message: `That moderator's username is already exists'`
                };
            }
        }
        return null;
    }
}
exports.default = tableUsersService;
//# sourceMappingURL=tbl_users.service.js.map