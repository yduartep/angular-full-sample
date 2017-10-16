import {Subscription} from "rxjs/Subscription";
import {OnDestroy} from "@angular/core";
import {Subject} from "rxjs/Subject";

export abstract class UnSubscriptionHandler implements OnDestroy {
  protected componentDestroyed: Subject<void> = new Subject<void>();
  // protected serviceSubscriptions: Subscription[] = [];

  /**
   * Add new service subscription to the list
   * @param serviceSubscription the service subscription

  subscribeService(serviceSubscription: Subscription) {
    this.serviceSubscriptions.push(serviceSubscription);
  }

  unsubscribeServices() {
    this.serviceSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }*/

  ngOnDestroy() {
    // this.unsubscribeServices();
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
