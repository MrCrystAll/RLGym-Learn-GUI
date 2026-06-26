interface IdleAPIArgs{
  startingAPI: boolean
  error: Error | null
  isBugged: boolean
}

function IdleAPI({startingAPI, error, isBugged}: IdleAPIArgs){
    const quit = () => {
      window.api.quit();
    }

    if(isBugged){
      return <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
        <h2 className="text-danger text-center">The API didn't launch correctly, please report this to the maintainer and restart.</h2>

        <button className="mt-3 btn w-50 btn-danger" onClick={quit}>Quit</button>
      </div>
    }

    return (
      <div className="d-flex justify-content-center align-items-center vh-100 flex-column">

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
        <h4 className="fw-medium">{startingAPI ? "Starting API..." : "API started"}</h4>
        <small className="text-danger">{error?.cause !== "Reason" ? error?.message : null}</small>
      </div>
    )
}

export default IdleAPI