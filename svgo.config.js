const prefix = process.env.prefix

module.exports = {
    plugins: [
        'removeDimensions',
        'preset-default',
        {
            name: 'cleanupEnableBackground',
            active: prefix === 'icon',
        },
        {
            name: 'removeStyleElement',
            active: prefix === 'icon',

        },
        {
            name: "removeAttrs",
            active: prefix === 'icon',
            params: {
                attrs: prefix === 'icon' ? "(fill|id|style)" : "(id)"
            }
        },
    ]
};
