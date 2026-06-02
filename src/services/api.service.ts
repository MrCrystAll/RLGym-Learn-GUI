import axios, { AxiosError } from "axios";

import {Configuration, DefaultApi, ProjectApi, RunsApi, SessionApi, type ProjectCreationArgs, type ProjectMetadata, type RLGymLearnApiExceptionModel} from "rlgym-learn-client"
import {Result, ok, err} from "neverthrow"

const port = (window as any).electron?.apiPort ?? '8000';

class APIService {
  public projectApi: ProjectApi
  public sessionApi: SessionApi
  public runsApi: RunsApi
  protected defaultApi: DefaultApi

  constructor() {
    const client = axios.create({
      baseURL: `http://localhost:${port}`,
      timeout: 20_000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.projectApi = new ProjectApi(new Configuration(), undefined, client);
    this.defaultApi = new DefaultApi(new Configuration(), undefined, client);
    this.sessionApi = new SessionApi(new Configuration(), undefined, client);
    this.runsApi = new RunsApi(new Configuration(), undefined, client);
  }

  async startAPI(){
    return window.api.start();
  }
  
  async getAllProjects(): Promise<Result<ProjectMetadata[], AxiosError<RLGymLearnApiExceptionModel>>>{
    return this.projectApi.getAllProjects()
      .then((r) => ok(r.data))
      .catch((e) => err(e))
  }

  async createProject(args: ProjectCreationArgs): Promise<Result<string, AxiosError<RLGymLearnApiExceptionModel>>>{
    return this.projectApi.createProject(args).then((r) => ok(r.data)).catch((e) => err(e));
  }

  async getRootFolder(): Promise<string>{
    return await this.projectApi.getRootFolder().then((r) => r.data);
  }

  async updateRootFolder(rootFolder: string): Promise<void>{
    await this.projectApi.updateRootFolder({
      path: rootFolder
    });
  }
}

export default new APIService();
