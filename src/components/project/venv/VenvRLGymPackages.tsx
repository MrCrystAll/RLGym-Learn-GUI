import { Card } from "react-bootstrap"
import PackageStatus from "./PackageStatus"
import type { PackageInfo } from "rlgym-learn-client"

interface VenvRLGymPackagesArgs{
    packages: Record<string, PackageInfo>;
    updateStatus: Record<string, boolean>

    install: (name: string) => void
    update: (name: string) => void
    uninstall: (name: string) => void
}

const knownPackages: Record<string, string> = {
    "rlgym": "RLGym",
    "rlgym-api": "RLGym API",
    "rlgym-rocket-league": "RLGym (Rocket League)",
    "rocketsim": "RocketSim",
    "rlviser-py": "RLViser",
    "rlgym-learn": "RLGym Learn",
    "rlgym-learn-algos": "RLGym Learn Algos"
}

function VenvRLGymPackages({packages, updateStatus, install, update, uninstall}: VenvRLGymPackagesArgs){
    return (
        <div>
            <p>Here are all the packages officially supported by this application. These are all related to RLGym and can be used in your virtual environment</p>
            <div className="d-grid gap-2" style={{"gridTemplateColumns": "1fr 1fr 1fr"}}>
                {Object.entries(knownPackages).map(
                    ([name, _]) => {
                        const packageNames = Object.keys(packages);
                         
                        if(packageNames.includes(name)) return <PackageStatus key={name} canBeInstalled={!packageNames.includes(name)} install={() => install(name)} name={knownPackages[name]} canBeUpdated={updateStatus[name] !== undefined} update={() => update(name)} uninstall={() => uninstall(name)} version={packages[name].version} summary={packages[name].summary}></PackageStatus>;
                        else return <Card key={name}>
                            <Card.Header>
                                <button className="btn btn-primary float-end" onClick={() => install(name)}>Install</button>
                                <Card.Title>{knownPackages[name]}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <p>It appears this package is not installed. You can install it as it is part of the recommended settings.</p>
                            </Card.Body>
                        </Card>
                    }
                )}
            </div>
        </div>
    )
}

export default VenvRLGymPackages