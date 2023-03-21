export class ServiceRequest {
  constructor(
    public isLoadnig: Boolean = false,
    public isError: Boolean = false,
    public errorMessage: String = "",
    public isAddRequest: Boolean = false
  ) { }

  public start(): void {
    this.isLoadnig = true;
    this.isError = false;
    this.errorMessage = "";
  }

  public end(): void {
    this.isLoadnig = false;
  }

  public error(errorMessage: String = ""): void {
    this.errorMessage = errorMessage
  }

  public clear(): void {
    this.isLoadnig = true;
    this.isError = false;
    this.errorMessage = "";
    this.isAddRequest = false;
  }

  public add(value: Boolean = true): void {
    this.isAddRequest = value;
  }

  public isAdd(): Boolean {
    return this.isAddRequest;
  }

}