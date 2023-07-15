import { Subject, BehaviorSubject } from '../src';

describe('Subject', () => {
    test('should broadcast to multiple observers', () => {
        const observer1 = {
            next: jest.fn(),
            error: jest.fn(),
            complete: jest.fn(),
        };

        const observer2 = {
            next: jest.fn(),
            error: jest.fn(),
            complete: jest.fn(),
        };

        const subject = new Subject<string>();
        subject.subscribe(observer1);
        subject.subscribe(observer2);

        subject.next('test');

        expect(observer1.next).toHaveBeenCalledWith('test');
        expect(observer2.next).toHaveBeenCalledWith('test');
    });

    test('should not broadcast to unsubscribed observers', () => {
        const observer1 = {
            next: jest.fn(),
            error: jest.fn(),
            complete: jest.fn(),
        };

        const subject = new Subject<string>();
        const subscription = subject.subscribe(observer1);

        subscription.unsubscribe();
        subject.next('test');

        expect(observer1.next).not.toHaveBeenCalled();
    });
});

describe('BehaviorSubject', () => {
    test('should send initial value to observers upon subscription', () => {
        const observer = {
            next: jest.fn(),
            error: jest.fn(),
            complete: jest.fn(),
        };

        const behaviorSubject = new BehaviorSubject<string>('init');
        behaviorSubject.subscribe(observer);

        expect(observer.next).toHaveBeenCalledWith('init');
    });

    test('should send last value to new subscribers', () => {
        const observer1 = {
            next: jest.fn(),
            error: jest.fn(),
            complete: jest.fn(),
        };

        const observer2 = {
            next: jest.fn(),
            error: jest.fn(),
            complete: jest.fn(),
        };

        const behaviorSubject = new BehaviorSubject<string>('init');
        behaviorSubject.subscribe(observer1);
        behaviorSubject.next('test');
        behaviorSubject.subscribe(observer2);

        expect(observer1.next).toHaveBeenCalledWith('init');
        expect(observer1.next).toHaveBeenCalledWith('test');
        expect(observer2.next).toHaveBeenCalledWith('test');
    });
});
