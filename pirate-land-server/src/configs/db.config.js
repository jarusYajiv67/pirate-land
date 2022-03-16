const clientConfig = {
    cloud: {
        secureConnectBundle: "PATH_TO_SECURE_BUNDLE"
    },
    credentials: {
        username: process.env.ASTRA_CLIENT_ID,
        password: process.env.ASTRA_CLIENT_SECRET
    },
    keyspace: process.env.ASTRA_DB_KEYSPACE
};

module.exports = clientConfig;
