import { CloseButton, Modal } from "react-bootstrap"
import PackageStatus from "./PackageStatus"
import { useState } from "react"
import type { PackageInfo } from "rlgym-learn-client"

interface FullPackageListArgs{
    packages: Record<string, PackageInfo>
    updateStatus: Record<string, boolean>

    update: (name: string) => void
    uninstall: (name: string) => void
    install: (name: string) => void
    installRequirements: (reqPath: string) => void

    isOpen: boolean
    handleClose: () => void
}

enum PackageInstallType{
    NAME,
    REQUIREMENTS
}

function FullPackageList({packages, updateStatus, update, uninstall, install, installRequirements, isOpen, handleClose}:FullPackageListArgs) {
    const [requirementsPath, setRequirementsPath] = useState<string | null>(null);
    const [installType, setInstallType] = useState<PackageInstallType>(PackageInstallType.NAME);

    const openDialogForRequirements = () => {
        const result: Promise<string[] | undefined> = window.api.openPathDialog(false, ["txt"], "requirements");
        result.then(
            (value: string[] | undefined) => {
                if(value === undefined) return;
                else {
                    setRequirementsPath(value[0].normalize());
                }
            }
        ).catch((reason) => {});
    }

    const installPackage = (formData: FormData) => {
        const packageName: string | undefined = formData.get("packageName")?.toString();

        install(packageName)
    }

    const installReq = () => {
        if(requirementsPath === null){
            return;
        }
        installRequirements(requirementsPath)
    }

    const installPackageForm = () => {
        if(+installType === PackageInstallType.NAME){
            return <div>
                <p className="fw-bold">Install a package</p>

                    <form action={installPackage}>
                        <label>Package name</label>
                        <input className="form-control" type="text" name="packageName"></input>
                        <button className="btn btn-primary mt-2" type="submit">Install</button>
                    </form>
            </div>
        }
        return <div>
                    <p className="fw-bold">Install a requirements file</p>
                    <div>
                        <p>Requirents path: {requirementsPath === null ? "No requirements" : requirementsPath}</p>
                        <button className="btn btn-primary" onClick={openDialogForRequirements}>Choose requirements file</button>
                        <button className="btn btn-primary" hidden={requirementsPath === null} onClick={installReq}>Install</button>
                    </div>
                    

                    
                </div>
    }

    const toUpdateList = () => {
        if(Object.keys(updateStatus).length === 0) return <p>No package to update.</p>
        return <div className="mb-2">
            <p className="fw-bold">Packages to update</p>
            <div className="d-grid gap-2 mt-2" style={{"gridTemplateColumns": "1fr 1fr"}}>
                {Object.entries(packages).filter(([value, _]) => Object.keys(updateStatus).includes(value)).map(
                    ([value, details]) => <PackageStatus canBeInstalled={false} install={() => install(value)} canBeUpdated={updateStatus[value]} name={value} version={details.version} summary={details.summary} key={value} update={() => update(value)} uninstall={() => uninstall(value)}></PackageStatus> 
                )}
            </div>
        </div>
    }

    return (
        <Modal show={isOpen} size="xl">
            <Modal.Header>
                <Modal.Title>All packages</Modal.Title>
                <CloseButton onClick={handleClose}></CloseButton>
            </Modal.Header>
            <Modal.Body>
                <p>Here are all the packages you installed in this virtual environment. You can update or uninstall them here. The packages you can update will be shown at the top of this modal.</p>

                <div>
                    <p>Install from:</p>

                    <div className="btn-group">
                        <button className={"btn btn-primary" + (installType === PackageInstallType.NAME ? " active" : "")} onClick={() => setInstallType(PackageInstallType.NAME)}>A package name</button>
                        <button className={"btn btn-primary" + (installType === PackageInstallType.REQUIREMENTS ? " active" : "")} onClick={() => setInstallType(PackageInstallType.REQUIREMENTS)}>A requirements file</button>
                    </div>
                </div>

                <div className="mt-2">
                    {installPackageForm()}
                </div>
                <div className="mt-2">
                    {toUpdateList()}
                </div>
                
                <hr></hr>
                <div className="d-grid gap-2 mt-2" style={{"gridTemplateColumns": "1fr 1fr 1fr"}}>
                    {Object.entries(packages).map(
                        ([name, data]) => <PackageStatus canBeInstalled={false} install={() => {}} name={name} canBeUpdated={updateStatus[name] !== undefined} update={() => update(name)} uninstall={() => uninstall(name)} version={data.version} summary={data.summary} key={name}></PackageStatus>
                    )}
                </div>
            </Modal.Body>
        </Modal>
        
    )
}

export default FullPackageList