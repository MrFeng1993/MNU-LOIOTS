import Command from "@ckeditor/ckeditor5-core/src/command";

export default class BoldCommand extends Command {


  // 在编辑器更新的时候执行，类似于 React 中的 render 函数
  refresh() {
    // @ts-ignore
    this.isEnabled = true;
  }

  // 是该命令的执行函数，会在命令被触发时执行
  execute() {
    console.log("Execute Plugin-Bold");
  }
}