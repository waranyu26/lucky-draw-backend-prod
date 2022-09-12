export declare const message: {
    success: {
        insert: string;
        update: string;
        delete: string;
        user: {
            email: string;
            login: string;
            password: string;
            passwordReset: string;
        };
        ok: string;
        created: string;
        updated: string;
    };
    errors: {
        notFound: string;
        insert: string;
        user: {
            email: string;
            password: string;
            invalidUserPassword: string;
            passwordNotMatched: string;
        };
        badRequest: string;
        internal: string;
    };
    validation: {
        number: string;
    };
};
