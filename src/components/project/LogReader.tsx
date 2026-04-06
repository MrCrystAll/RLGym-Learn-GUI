import { useEffect } from "react";


function LogReader({active, logPath, lines, maxLines}) {
    useEffect(() => {
      window.api.stopWatch();
      window.api.removeAllListeners();
      if(active){       
        window.api.watchLog(logPath);
      }
    }, [active]);

    useEffect(() => {
      return () => {
        window.api.stopWatch();
        window.api.removeAllListeners();
      }
    }, [])

  return (
    <>
    <p>Showing last {maxLines} logs</p>
    <div style={{ fontFamily: "monospace", background: "#111", color: "#0f0", padding: 16 }}>
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
