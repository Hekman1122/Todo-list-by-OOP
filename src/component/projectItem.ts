import { Component } from "./component";
import { Project } from "./project";
import { autoBind } from "../util/autobind";
import { Draggable } from "../util/DnD";
//建立Project item class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  //建立拖曳事件處理器
  @autoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }
  @autoBind
  dragEndHandler(_: DragEvent): void {
    console.log("drag end!");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent =
      "參與人數 : " + this.project.people.toString();

    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
