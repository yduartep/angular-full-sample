export class ProcessFilterFormVariable {
  private _variableKey: string;
  private _variableValue: string;


  constructor(variableKey: string, variableValue: string) {
    this._variableKey = variableKey;
    this._variableValue = variableValue;
  }

  get variableKey(): string {
    return this._variableKey;
  }

  set variableKey(value: string) {
    this._variableKey = value;
  }

  get variableValue(): string {
    return this._variableValue;
  }

  set variableValue(value: string) {
    this._variableValue = value;
  }
}
