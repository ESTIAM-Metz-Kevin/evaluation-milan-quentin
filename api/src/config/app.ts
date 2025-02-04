export default function() {
    return {
        port: process.env.APP_PORT ?? 3000,
    }
}