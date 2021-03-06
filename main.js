const { app, dialog, Tray, ipcRenderer, Menu, MenuItem, ipcMain, globalShortcut, BrowserWindow } = require('electron')
const path = require('path')

let window;
let tray = null;
function createWindow () {
    // 创建浏览器窗口

    window = new BrowserWindow({ width: 800, height: 600, frame:true, title: '天狼网络', center: true, titleBarStyle: 'hiddenInset' })                      

    window.loadFile('index.html')

    // 打开开发者工具
    // window.webContents.openDevTools()

    // 当 window 被关闭，这个事件会被触发。
    window.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
      
        window = null
    })

    tray = new Tray(path.join(__dirname,'/images/wolf_16x16.png'))
    tray.setContextMenu(Menu.buildFromTemplate([
      { label: 'Item1', type: 'radio' },
      { label: 'Item2', type: 'radio' },
      { label: 'Item3', type: 'radio', checked: true },
      { label: 'Item4', type: 'radio' }
    ]))
}

app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

app.dock.setIcon(path.join(__dirname,'/images/wolf.png'))

  
ipcMain.on('show-context-menu', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  menu.popup(win)
})
  

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (window === null) {
      createWindow()
    }
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll()
})