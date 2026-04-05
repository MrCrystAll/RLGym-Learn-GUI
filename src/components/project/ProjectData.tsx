function ProjectData({projectData}) {
    const rewardFiles = () => {
        if(projectData.rewards_files.length > 0){
            return (
                <>
                    <p>Reward files:</p>
                    {projectData.rewards_files.map((file: string, index: number) => <p key={index}>{file}</p>)}
                </>
            )
        }
        else{
            return (
                    <p>No reward files found</p>
            )
        }
    }
    
    const entrypoint = () => {
        if(projectData.entrypoint !== undefined)
        {
            return (
                <p><b>Entrypoint:</b> {projectData.entrypoint}</p>
            )
        }
        else{
            return (
                <p>No entrypoint found</p>
            )
        }
    }

    if(projectData === undefined){
        return (
            <p>No data found for this project</p>
        )
    }
    else{
        return (
            <div>
                <div>
                    {rewardFiles()}
                </div>

                <div>
                    {entrypoint()}
                </div>
            </div>
        )
    }

  
}

export default ProjectData
