import { Observable, Subject, Subscription } from 'rxjs';

/**
 * 
 */
export class EventBroadcaster<T> {
  private setData = new Subject<T>();
  private setData$: Observable<T>;

  constructor(
  ) {
    this.setData$ = this.setData.asObservable();
  }

  /**
   * 
   * @param fn 
   * @returns 
   */
  subscribe(fn: any): Subscription {
    return this.setData$.subscribe(fn);
  }

  /**
   * 
   * @param data 
   */
  signal(data: T):void {
    this.setData.next(data); // signal changes
  };
}