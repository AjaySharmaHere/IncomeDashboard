declare module "flowbite-datepicker/Datepicker" {
  interface DatepickerOptions {
    autohide?: boolean;
    format?: string;
    todayHighlight?: boolean;
    theme?: "light" | "dark";
    [key: string]: any;
  }

  export default class Datepicker {
    constructor(element: HTMLElement, options?: DatepickerOptions);
    destroy(): void;
    show(): void;
    hide(): void;
  }
}
