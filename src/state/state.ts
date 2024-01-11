import { Project, ProjectStatus } from "../component/project";

//Type of Listener
type Listener<T> = (items: T[]) => void;

//建立state base class
class State<T> {
  protected listeners: Listener<T>[] = [];
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

//Project State Management
class ProjectState extends State<Project> {
  private projects: Project[] = [];
  //確保此物件只存在一個，使用singleton
  private static instance: ProjectState;
  private constructor() {
    super();
  }

  //建立靜態方法，只有類別本身才能存取
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateState();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((p) => p.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateState();
    }
  }

  private updateState() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

//建立 state management 全域物件
export const projectState = ProjectState.getInstance();
