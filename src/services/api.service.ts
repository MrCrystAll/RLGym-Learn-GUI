import axios from "axios";

import {Configuration, DefaultApi, ProjectApi, RunsApi, SessionApi, type ProjectCreationArgs, type ProjectMetadata} from "rlgym-learn-client"

class APIService {
  public projectApi: ProjectApi
  public sessionApi: SessionApi
  public runsApi: RunsApi
  protected defaultApi: DefaultApi

  constructor() {
    const client = axios.create({
      baseURL: "http://localhost:8000",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.projectApi = new ProjectApi(new Configuration(), undefined, client);
    this.defaultApi = new DefaultApi(new Configuration(), undefined, client);
    this.sessionApi = new SessionApi(new Configuration(), undefined, client);
    this.runsApi = new RunsApi(new Configuration(), undefined, client);
  }

  async checkApiStatus(): Promise<void> {
    return await this.defaultApi.pingGet().then((r) => r.data);
  }
  
  async getAllProjects(): Promise<ProjectMetadata[]>{
    return await this.projectApi.getAllProjects().then((r) => r.data);
  }

  async createProject(args: ProjectCreationArgs): Promise<string>{
    return await this.projectApi.createProject(args).then((r) => r.data);
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
