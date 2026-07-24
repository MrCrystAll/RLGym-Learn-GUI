import { Card } from "react-bootstrap"

interface PackageStatusArgs{
    name: string
    version: string
    summary: string
    canBeUpdated: boolean
    canBeInstalled: boolean

    install: () => void
    update: () => void
    uninstall: () => void
}

function PackageStatus({name, version, summary, canBeUpdated, canBeInstalled, install, update, uninstall}: PackageStatusArgs){
    const updateButton = () => {
        if(canBeUpdated){
            return <button className="btn btn-info" onClick={() => update()}>Update</button>
        }
    }

    const headerButtons = () => {
        if(canBeInstalled){
            return <div className="float-end btn-group ms-2">
                <button className="btn btn-success" onClick={() => install()}>Install</button>
            </div>
        }
        return <div className="float-end btn-group ms-2">
                {updateButton()}
                <button className="btn btn-danger" onClick={() => uninstall()}>Uninstall</button>
            </div>
    }

    return <Card key={name}>
        <Card.Header>
            {headerButtons()}
            <Card.Title>{name}</Card.Title>
        </Card.Header>
        <Card.Body>
            <i className="text-secondary">{summary}</i>
        </Card.Body>
        
        <Card.Footer>
            <p className="my-auto">Version v{version}</p>
        </Card.Footer>
    </Card>
}

export default PackageStatus