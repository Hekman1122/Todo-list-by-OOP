import { Component } from "./component";
import { DragTarget } from "../util/DnD";
import { Project, ProjectStatus } from "./project";
import { autoBind } from "../util/autobind";
import { projectState } from "../state/state";
import { ProjectItem } from "./projectItem";
//ProjectList
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-project`);

    this.assignProjects = [];

    this.element.id = `${this.type}-project`;
    this.element.classList.add(
      `${this.type === "active" ? "border-blue-500" : "border-green-500"}`
    );

    this.configure();
    this.renderContent();
  }

  @autoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("bg-neutral-200");
    }
  }
  @autoBind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("bg-neutral-200");
  }
  @autoBind
  dropHandler(event: DragEvent): void {
    const projectId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      projectId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    //將projectsState的陣列複製到renderList裡面
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignProjects = relevantProjects;
      this.renderProjects();
    });
  }

  private renderProjects() {
    const listElement = document.querySelector(
      `#${this.type}-project-list`
    )! as HTMLUListElement;
    listElement.innerHTML = "";
    for (const projectItem of this.assignProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
    }
  }

  renderContent() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + "-Projects";
  }
}
