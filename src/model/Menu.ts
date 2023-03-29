export class LinkItem {
  constructor(
    public id: number = -1,
    public link: string = "#",
    public title: string = "LinkTitle",
    public active: boolean = false,
    public access: "all" | "security" | "admin" | "user" = "all"
  ) { }
}