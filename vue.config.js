const PACKAGE = require('./package.json')
  let config = {
    productName: PACKAGE.name,
    version: PACKAGE.version,
  }

module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  //多页面打包
  publicPath: './',
  pages: {
    main: {
      entry: 'src/modules/main/main.js',
      template: 'public/main.html',
      filename: 'main.html',
      title: 'Main Page',
    },
    remind: {
      entry: 'src/modules/remind/remind.js',
      template: 'public/remind.html',
      filename: 'remind.html',
      title: 'Remind Page',
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // appId: 'com.cmd.app',
        productName: 'AppDemo', //项目名，也是生成的安装文件名，即aDemo.exe
        copyright: 'Copyright © 2023 基础技术', //版权信息
        directories: {
          output: 'dist', //输出文件路径
          // buildResources: 'public'
        },
        // files: [
        //   "./build/**/*",
        //   "./dist/**/*",
        //   "./node_modules/**/*",
        //   "./public/**/*",
        //   "*.js"
        // ],
        win: {
          icon: 'public/win.ico',
          target: [
            {
              target: 'nsis',
              arch: ['x64', 'ia32'],
            },
          ],
        },
        mac: {
          icon: 'public/mac.png',
          target: 'dmg',
          hardenedRuntime: true,
          gatekeeperAssess: true,
          extendInfo: {
            NSAppleEventsUsageDescription: 'Let me use Apple Events.',
            NSCameraUsageDescription: 'Let me use the camera.',
            NSScreenCaptureDescription: 'Let me take screenshots.',
          }
        },
        // 配置安装程序
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: 'public/favicon.ico', // 安装图标
          uninstallerIcon: 'public/favicon.ico', //卸载图标
          installerHeaderIcon: 'public/favicon.ico', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: 'demo', // 图标名称
        },
        dmg: {
          background: 'public/img/background_2.png',
          title: `${config.productName} ${config.version}`,
          icon: 'public/mac.png',
          iconSize: 100,
          contents: [
            {
              x: 255,
              y: 85,
              type: 'file'
            },
            {
              x: 253,
              y: 325,
              type: 'link',
              path: '/Applications'
            }
          ],
          window: {
            width: 500,
            height: 500
          }
        }
      },
    },
  },
};
