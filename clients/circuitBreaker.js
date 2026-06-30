import CircuitBreaker from "opossum";

export const createCircuitBreaker = (fn, options = {}) => {
    const breaker = new CircuitBreaker(fn, {
        timeout: options.timeout || 3000,
        errorThresholdPercentage: options.errorThresholdPercentage || 50,
        resetTimeout: options.resetTimeout || 30000
    });

    if (options.fallback) {
        breaker.fallback(options.fallback);
    }

    return breaker;
}