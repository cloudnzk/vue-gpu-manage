// 通用环境配置

// env: development/test/production
// 根据当前的模式（开发/测试/生产）去取对应的配置
const env = process.env.NODE_ENV || 'production'

const EnvConfig = {
    development: {
        // baseApi: '/api',
        baseApi: 'http://127.0.0.1:3001/api',
        mockApi: 'https://www.fastmock.site/mock/570516aa02cdbd8eae42789628bb362b/api'
    },
    test: {
        baseApi: '/test.com/api',
        mockApi: 'https://www.fastmock.site/mock/570516aa02cdbd8eae42789628bb362b/api'
    },
    production: {
        baseApi: '/production.com/api',
        mockApi: 'https://www.fastmock.site/mock/570516aa02cdbd8eae42789628bb362b/api'
    },
}

export default {
    env,
    mock: false,
    stroageSpace: 'manager',
    // 对象解构
    ...EnvConfig[env]
}