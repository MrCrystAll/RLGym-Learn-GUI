function ProjectData({projectData}) {

    if(projectData === undefined){
        return (
            <p>No data found for this project</p>
        )
    }
    else{
        return (
            <div>
                <div>
                    <p className="fw-bold">Reward files:</p>
                    {projectData.rewards_files.map((file, index) => <p key={index}>{file}</p>)}
                </div>

                <div>
                    <p className="fw-bold">Entrypoint:</p>
                    <p>{projectData.entrypoint}</p>
                </div>
            </div>
        )
    }

  
}

export default ProjectData
