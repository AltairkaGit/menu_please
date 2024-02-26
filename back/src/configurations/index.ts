export default () => ({
    port: process.env.PORT,

    db_source: process.env.DB_SOURCE,
    db_port: process.env.DB_PORT,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,

    jwt_secret: process.env.JWT_SECRET,
    jwt_expires: process.env.JWT_EXPIRES,
})