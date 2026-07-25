import { useLoader } from "../hooks/useLoader";

export function LoaderScreen(){
    const {waiting, title, details} = useLoader();
    

    if(waiting){
        return <div style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            zIndex: 10000,
            top: 0
}} className="loader d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column align-items-center justify-content-center">  
                <div className="spinner-border " role="status" style={{width: "3rem", height: "3rem", zIndex: 20}}>
                    
                </div>
                <p className="display-5 mt-3 text-center">{title}</p>
                <p className="text-center" hidden={details === undefined}>{details}</p>
            </div>
        </div>
    }
    return <div>Wassup</div>
}