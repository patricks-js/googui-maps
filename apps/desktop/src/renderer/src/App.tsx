export function App() {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div style={{ fontFamily: 'Inter' }}>Powered by electron-vite</div>
      <div>
        Build an Electron app with <span>React</span>
        &nbsp;and TypeScript
      </div>

      <button type="button" onClick={ipcHandle}>
        Send IPC
      </button>
    </>
  )
}
