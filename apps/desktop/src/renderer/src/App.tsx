export function App() {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div className="text-sm font-medium text-center">
        Powered by electron-vite
      </div>
      <div className="text-xl font-semibold text-center">
        Build an Electron app with <span>React</span>
        &nbsp;and TypeScript
      </div>
      <div className="flex justify-center">
        <button
          className="text-sm font-medium rounded px-3 py-1 border border-zinc-400 text-center"
          type="button"
          onClick={ipcHandle}
        >
          Send IPC
        </button>
      </div>
    </>
  )
}
