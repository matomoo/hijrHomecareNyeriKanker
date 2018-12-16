import { observable } from 'mobx';

class User {
  @observable private _displayName: string;
  @observable private _age: number;
  @observable private _job: string;

  @observable private _uid: string;
  @observable private _userRole: string;
  @observable private _userNamaLengkap: string;

  public get displayName(): string {
    return this._displayName;
  }

  public set displayName(value: string) {
    this._displayName = value;
  }

  public get age(): number {
    return this._age;
  }

  public set age(value: number) {
    this._age = value;
  }

  public get job(): string {
    return this._job;
  }
  public set job(value: string) {
    this._job = value;
  }

  public get uid(): string {
    return this._uid;
  }
  public set uid(value: string) {
    this._uid = value;
  }

  public get userRole(): string {
    return this._userRole;
  }
  public set userRole(value: string) {
    this._userRole = value;
  }

  public get userNamaLengkap(): string {
    return this._userNamaLengkap;
  }
  public set userNamaLengkap(value: string) {
    this._userNamaLengkap = value;
  }

}

export default User;
