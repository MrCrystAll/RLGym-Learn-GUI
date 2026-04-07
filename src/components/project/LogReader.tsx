import { useEffect } from "react";


function LogReader({active, logPath, lines, setLines, maxLines}) {
    useEffect(() => {
      
      window.api.removeAllListeners();
      window.api.stopWatch();
      if(active){       
        window.api.watchLog(logPath);
        window.api.listenLines(setLines, maxLines);
      }
    }, [active]);

    useEffect(() => {
      return () => {
        window.api.stopWatch();
      }
    }, [])

  return (
    <>
    <p>Showing last {maxLines} logs</p>
    <div style={{ fontFamily: "monospace", background: "#111", color: "#0f0", padding: 16 }}>
      <p>Project logs <span style={{ color: "#F88" }}>(STDOUT)</span></p>
      {lines.map((entry, i) => (
        <div key={i}>
          <span style={{ color: "#555" }}>[{entry.timestamp}]</span> {entry.line}
        </div>
      ))}
    </div>
    </>
  )
}

export default LogReader
