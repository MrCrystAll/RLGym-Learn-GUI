
export interface LineEntry{
    timestamp: string,
    line: string
}

export enum PageType{
    CONFIGURATION,
    PROCESS,
    MAIN,
    RUN
}

export function openDialog() {
        return new Promise<string>(
            (resolve, reject) => {
                const result: Promise<string[] | undefined> = window.api.openPythonPathDialog();
                result.then(
                    (value: string[] | undefined) => {
                        if(value === undefined) reject("No value chosen by the user.");
                        else {
                            resolve(value[0].normalize());
                        }
                    }
                )
            }
        )
    }