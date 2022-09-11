"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "message", {
    enumerable: true,
    get: ()=>message
});
const message = {
    success: {
        insert: 'Row(s) inserted',
        update: 'Row(s) updated',
        delete: 'Row(s) deleted',
        user: {
            email: 'Details has been sent to your mail, if Exists.(Email - In development)',
            login: 'User Login Successful',
            password: 'User Password Updated',
            passwordReset: 'A reset password mail has been sent to your email if it exists in our system.'
        },
        ok: 'OK',
        created: 'Created',
        updated: 'Updated'
    },
    errors: {
        notFound: 'No data found',
        insert: 'No data inserted',
        user: {
            email: 'User name should be email address',
            password: 'User Password not changed due to an error while updating',
            invalidUserPassword: 'Invalid username or password',
            passwordNotMatched: 'Current password not matched'
        },
        badRequest: 'Bad request',
        internal: 'Internal server error'
    },
    validation: {
        number: 'must be a number'
    }
};

//# sourceMappingURL=index.js.map