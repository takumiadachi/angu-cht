import { Inject, Injectable } from "@angular/core";
import { SESSION_STORAGE, StorageService } from "ngx-webstorage-service";

const STORAGE_KEY = "pure-awesomeness";

@Injectable({
  providedIn: "root"
})
export class StorestuffService {
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {}

  public doSomethingAwesome(): number {
    const awesomenessLevel: number = this.storage.get(STORAGE_KEY) || 1337;
    this.storage.set(STORAGE_KEY, awesomenessLevel + 1);
    return awesomenessLevel;
  }
}
