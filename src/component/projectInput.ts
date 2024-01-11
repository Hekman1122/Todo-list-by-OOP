import { Component } from "./component";
import { Validate, validate } from "../util/validation";
import { autoBind } from "../util/autobind";
import { projectState } from "../state/state";
// Form input class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")!
    );

    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")!
    );

    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")!
    );
    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  //   getUserInput;
  private getUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value!;
    const description = this.descriptionInputElement.value!;
    const people = this.peopleInputElement.value!;

    const titleValidate: Validate = {
      value: title,
      required: true,
    };
    const descriptionValidate: Validate = {
      value: description,
      required: true,
      minLength: 10,
    };
    const peopleValidate: Validate = {
      value: people,
      required: true,
      min: 1,
      max: 5,
    };
    if (
      !validate(titleValidate) ||
      !validate(descriptionValidate) ||
      !validate(peopleValidate)
    ) {
      alert("輸入不完全，請重新填寫");
      return;
    } else {
      return [title, description, +people];
    }
  }

  private clearInput() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
    }

    this.clearInput();
  }
}
