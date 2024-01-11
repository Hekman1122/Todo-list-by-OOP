//1.新增工作事項後，由submitHandler觸發projectState.addProject
//2.projectState.addProject 將新增的工作事項轉為物件加入ProjectState.projects當中
//3.projectState.addProject 將listeners陣列中的函式全部執行，參數為ProjectState.projects
//4.建立ProjectList列表，將ProjectState.projects陣列中的工作事項區分為完成和待辦
//5.ProjectList的constructor執行時連帶執行projectState.addListener， listener陣列目前只會有兩種listener在裡面
//6.listener為一函式，負責執行渲染工作，將以分類成完成或者代辦的工作事項渲染至DOM元素中
//7每一次新增一工作事項，就重新渲染一次畫面
import { ProjectInput } from "./component/projectInput";
import { ProjectList } from "./component/projectList";
//初始化輸入表單
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
