const webpack = require('webpack');
const env = process.env;
const dotEnvironment = require("dotenv-webpack");
const {resolve} = require('path');

module.exports = {
    mode: "spa",
    build: {
        plugins: [
            new dotEnvironment({
                path: "./.env",
                safe: false
            })
        ],
        vendor: [
            'axios',
            'noty',
            'fabric'
        ]
    },
    plugins: [
        '~/plugins/axios',
        '~/plugins/noty'
    ],
    head: {
        titleTemplate: 'Uspy - %s',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: "description",
                name: "description",
                content: "Uspy - first blockchain img generator"
            },
            { property: "og:image", content: "/logo-big.jpg" }
        ]
    },
    loading: {
        color: '#c01d0a'
    },
    loadingIndicator: {
        background: '#1a2028',
        color: '#2e7ed7'
    },
    css: [
        'assets/styles/common.styl',
        '~/node_modules/noty/lib/noty.css',
        '~/node_modules/noty/lib/themes/nest.css'
    ],
    modules: [
        ['nuxt-stylus-resources-loader', resolve(__dirname, 'assets/styles/utils/vars.styl')]
    ]
};