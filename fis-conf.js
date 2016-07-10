var packConfig = require("./fis-config/pack");
var BabelConfig = {
    preprocessor: fis.plugin('js-require-css'),
    parser: fis.plugin('babel-5.x', {
        blacklist: ['regenerator'],
        stage: 3
    }),
    //sourceMaps: true,
    rExt: 'js',
    moduleId: '${namespace}:$0',
    isMod: true
};
fis.set('namespace', 'ops');

fis.set('project.files', [
    '/index.html',
    '/static/**',
    '/page/**',
    '/assets/**'
]);

// 配置详见 https://github.com/fex-team/fis3-hook-commonjs
fis.hook('commonjs', {
    extList: ['.js', '.jsx', '.es', '.ts', '.tsx'],
    ignoreDependencies: [] // 忽略 某些 的依赖。我自己负责加载需要资源。
});
fis.match('::package', {
    postpackager: fis.plugin('loader', {})
});
fis.match('/(**.{es6,jsx})', {
    parser: fis.plugin('babel-5.x', {
        blacklist: ['regenerator'],
        stage: 3
    }),
    rExt: '.js'
});

fis.match('/(**.{js,es6,jsx})', {
    preprocessor: fis.plugin('js-require-css'), //支持 js 中直接 require css
    moduleId: '${namespace}:$1', // fis3 版本兼容 给 moduleId 加上后缀 , 防止fis编译机编译后找不到模块
    isMod: true
});


fis.match('**.less', {
    parser: fis.plugin('less-2.x'),
    rExt: '.css'
});

// 入口文件不是模块化的
fis.match('widget/entry/index.jsx', {
    isMod: false
});


fis.match('widget/entry/home.jsx', {
    isMod: true
});


// mod.js 本身不是模块化
fis.match('static/js/mod.js', {
    isMod: false
});

fis.match('static/js/umd-libs/react-dom.js', {
        id: 'react-dom',
        moduleId: 'react-dom'
    })
    .match('static/js/umd-libs/react.js', {
        id: 'react',
        moduleId: 'react'
    })
    .match('static/js/umd-libs/react-router.js', {
        id: 'react-router',
        moduleId: 'react-router'
    })
    .match('static/js/umd-libs/antd/antd.js', {
        id: 'antd',
        optimizer:null,
        moduleId: 'antd'
    })
    .match('static/js/umd-libs/classnames.js', {
        id: 'classnames',
        moduleId: 'classnames'
    })
    .match('static/js/umd-libs/reqwest.js', {
        id: 'reqwest',
        moduleId: 'reqwest'
    });

// 本地开发
fis.media('dev')
    .match('*', {
        deploy: fis.plugin('local-deliver', {
            to: 'output'
        })
    })
    // .match('::package', {
    //     pakager: fis.plugin('map', packConfig)
    // })
    .match('*.{less,css}', {
        optimizer: fis.plugin('clean-css')
    })
    .match('*.{js,jsx}', {
        useHash: true,
        // optimizer: fis.plugin('uglify-js')
    })
    .match('static/js/umd-libs/antd/antd.js', {
        optimizer:null
    });

// 生产环境
fis.media('prod')
    .match('*.js', {
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                expect: ['require', 'define'] //不想被压的
            }
        })
    })
    .match('*', {
        deploy: fis.plugin('local-deliver', {
            to: 'output'
        })
    })
    .match('::package', {
        packager: fis.plugin('map', packConfig)
    })
    .match('*.{less,css}', {
        optimizer: fis.plugin('clean-css')
    })

    .match('static/js/umd-libs/antd/antd.js', {
        optimizer:null
    })