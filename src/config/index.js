// 通用环境配置

// env: development/test/production
// 根据当前的模式（开发/测试/生产）去取对应的配置
const env = process.env.NODE_ENV || 'production'

const EnvConfig = {
    development: {
        baseApi: '/',
        mockApi: ''
    },
    test: {
        baseApi: '/',
        mockApi: ''
    },
    production: {
        baseApi: '/',
        mockApi: ''
    },
}

export default {
    env,
    mock: true,
    // 对象解构
    ...EnvConfig[env]
}