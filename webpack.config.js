module.exports = {
    mode: "development",
    devServer: {
        contentBase: "./dist"
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use:['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
}