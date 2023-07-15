import { Observable, SafeObserver } from '../src';

describe('Observable', () => {
    test('should call next method of observer', () => {
        const observer = {
            next: jest.fn(),
            error: jest.fn(),
            complete: jest.fn(),
        };

        const observable = new Observable<string>((observer) => {
            observer.next('test');
        });

        observable.subscribe(observer);

        expect(observer.next).toHaveBeenCalledWith('test');
        expect(observer.error).not.toHaveBeenCalled();
        expect(observer.complete).not.toHaveBeenCalled();
    });

    test('should call error method of observer', () => {
        const observer = {
            next: jest.fn(),
            error: jest.fn(),
            complete: jest.fn(),
        };

        const observable = new Observable<string>((observer) => {
            observer.error('error');
        });

        observable.subscribe(observer);

        expect(observer.error).toHaveBeenCalledWith('error');
        expect(observer.next).not.toHaveBeenCalled();
        expect(observer.complete).not.toHaveBeenCalled();
    });

    test('should call complete method of observer', () => {
        const observer = {
            next: jest.fn(),
            error: jest.fn(),
            complete: jest.fn(),
        };

        const observable = new Observable<string>((observer) => {
            observer.complete();
        });

        observable.subscribe(observer);

        expect(observer.complete).toHaveBeenCalled();
        expect(observer.next).not.toHaveBeenCalled();
        expect(observer.error).not.toHaveBeenCalled();
    });
});

describe('SafeObserver', () => {
    test('should not call methods after unsubscribe', () => {
        const observer = {
            next: jest.fn(),
            error: jest.fn(),
            complete: jest.fn(),
        };

        const safeObserver = new SafeObserver(observer);

        safeObserver.unsubscribe();

        safeObserver.next('test');
        safeObserver.error('error');
        safeObserver.complete();

        expect(observer.next).not.toHaveBeenCalled();
        expect(observer.error).not.toHaveBeenCalled();
        expect(observer.complete).not.toHaveBeenCalled();
    });
});
