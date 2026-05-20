import type { Run, Session } from "rlgym-learn-client"
import type { LogConfig } from "./models/project"

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

export interface Page{
    type: PageType,
    name: string
}

export interface RunPageState {
    pages: Page[];
    activePage: Page;
}

export interface SessionPageModel extends Page
{
    session: Session
}

export interface RunPageModel extends Page
{
    run: Run
}