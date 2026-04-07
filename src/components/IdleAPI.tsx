function IdleAPI({checkAPIConnection, refresingApiStatus}){
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 flex-column bg-dark">

      <div className="pulse-wrapper mx-auto mb-5">
        <div className="pulse-ring"></div>
        <div className="pulse-ring"></div>
        <div className="pulse-ring"></div>

        <div className="position-absolute top-0 start-0 w-100 h-100
                    rounded-circle bg-primary bg-opacity-10
                    d-flex align-items-center justify-content-center">
          <i className="bi bi-clock fs-4 text-primary"></i>
        </div>
      </div>
        <h4 className="fw-medium text-white">Waiting for API</h4>
        <button className="btn btn-dark mt-3" onClick={checkAPIConnection} disabled={refresingApiStatus}>
          {refresingApiStatus ? "Refreshing" : "Refresh"}
          <i className="ms-2 bi bi-arrow-clockwise" hidden={refresingApiStatus}></i>
        </button>
      </div>
    )
}

export default IdleAPI