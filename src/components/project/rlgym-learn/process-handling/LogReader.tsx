import { useEffect, useState } from "react";
import type { LineEntry } from "../../../../api";

interface LogReaderArgs{
  logPath: string,
  streamName: string
  pid: number // To refresh when changing processes
}

function LogReader({logPath, streamName, pid}: LogReaderArgs) {
    const [hidden, setHidden] = useState(false);
    const [lines, setLines] = useState<LineEntry[]>([]);

    useEffect(() => {
      setLines([]);
      
      window.api.removeAllListeners(streamName);
      window.api.stopWatch(streamName);
      window.api.watchLog(logPath, streamName);
      window.api.listenLines(setLines, streamName);
    }, [pid]);

    useEffect(() => {
      return () => {
        window.api.stopWatch();
      }
    }, [])

    const content = () => {
      if(!hidden){
        return <div style={{overflowY: hidden ? "hidden" : "scroll", maxHeight: 300}}>
          {lines.map((entry, i) => (
            <div key={i}>
              <span style={{ color: "#555" }}>[{entry.timestamp}]</span> {entry.line}
            </div>
          ))}
        </div>
      }
    }

  return (
    <>
    <div style={{ fontFamily: "monospace", background: "#111", color: "#0f0", padding: 16, overflow: "hidden"}} className="border border-light rounded my-2">
      <button className="btn btn-outline-white float-end" style={{color: "white"}} onClick={() => setHidden(!hidden)}>{hidden ? "Show" : "Hide"}</button>
      <p>Project logs <span style={{ color: "#F88" }}>({streamName})</span></p>
      {content()}
    </div>
    </>
  )
}

export default LogReader
