import { Subscription } from '../src';

describe('Subscription', () => {
  let subscription: Subscription;
  let teardown: jest.Mock;

  beforeEach(() => {
    teardown = jest.fn();
    subscription = new Subscription(teardown);
  });

  test('should call teardown logic on unsubscribe', () => {
    subscription.unsubscribe();
    expect(teardown).toHaveBeenCalled();
    expect(subscription.closed).toBe(true);
  });

  test('should not call teardown logic twice', () => {
    subscription.unsubscribe();
    subscription.unsubscribe();
    expect(teardown).toHaveBeenCalledTimes(1);
  });

  test('should be able to add additional teardown logic', () => {
    const additionalTeardown = jest.fn();
    const additionalSubscription = new Subscription(additionalTeardown);

    subscription.add(additionalSubscription);
    subscription.unsubscribe();

    expect(additionalTeardown).toHaveBeenCalled();
  });

  test('should be able to remove additional teardown logic', () => {
    const additionalTeardown = jest.fn();
    const additionalSubscription = new Subscription(additionalTeardown);

    subscription.add(additionalSubscription);
    subscription.remove(additionalSubscription);
    subscription.unsubscribe();

    expect(additionalTeardown).not.toHaveBeenCalled();
  });
});
