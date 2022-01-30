import { Observable, SchedulerLike } from 'rxjs';
export default class RateLimiter {
    private requestsPerInterval;
    private intervalLength;
    private scheduler;
    private intervalEnds;
    private nActiveInCurrentInterval;
    constructor(requestsPerInterval: number, intervalLength: number, scheduler?: SchedulerLike);
    limit<T>(stream: Observable<T>): Observable<T>;
}
