const env = process.env;

const config = {
    db: { /* do not put password or any sensitive info here, done only for demo */
        host: env.DB_HOST || 'tyke.db.elephantsql.com',
        port: env.DB_PORT || '5432',
        user: env.DB_USER || 'zdofwofm',
        password: env.DB_PASSWORD || 'CpjoZQrwl2Ux5yF4AQXbrwAEYd00rMPj',
        database: env.DB_NAME || 'zdofwofm',
    },
    listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;