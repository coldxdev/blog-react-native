module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        '@components': './src/components',
                        '@consts': './src/consts',
                        '@redux': './src/redux',
                        '@assets': './src/assets/',
                    },
                },
            ],
        ],
    };
};
