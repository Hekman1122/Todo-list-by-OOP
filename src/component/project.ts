//Project Status enum
export enum ProjectStatus {
  Active,
  Finished,
}

//Project Type by using class definition
export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
