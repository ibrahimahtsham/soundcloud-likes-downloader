/**
 * Rate limit manager for SoundCloud API requests
 */
class RateLimitManager {
  constructor(maxRequests = 15000, windowMs = 60 * 60 * 1000) {
    // 15000 requests per hour
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  /**
   * Checks if a request can be made within rate limits
   * @returns {boolean} True if request is allowed
   */
  canMakeRequest() {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Remove requests outside the current window
    this.requests = this.requests.filter(
      (timestamp) => timestamp > windowStart
    );

    return this.requests.length < this.maxRequests;
  }

  /**
   * Records a request timestamp
   */
  recordRequest() {
    this.requests.push(Date.now());
  }

  /**
   * Gets the number of remaining requests in the current window
   * @returns {number} Number of remaining requests
   */
  getRemainingRequests() {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    const recentRequests = this.requests.filter(
      (timestamp) => timestamp > windowStart
    );

    return Math.max(0, this.maxRequests - recentRequests.length);
  }

  /**
   * Gets the time until the rate limit window resets
   * @returns {number} Milliseconds until reset
   */
  getTimeUntilReset() {
    if (this.requests.length === 0) {
      return 0;
    }

    const oldestRequest = Math.min(...this.requests);
    const resetTime = oldestRequest + this.windowMs;

    return Math.max(0, resetTime - Date.now());
  }

  /**
   * Waits for rate limit to allow next request
   * @returns {Promise} Resolves when request can be made
   */
  async waitForSlot() {
    if (this.canMakeRequest()) {
      this.recordRequest();
      return;
    }

    // Calculate wait time based on oldest request
    const waitTime = Math.min(
      1000,
      this.getTimeUntilReset() / this.requests.length
    );

    await new Promise((resolve) => setTimeout(resolve, waitTime));

    // Recursively check again
    return this.waitForSlot();
  }

  /**
   * Resets the rate limiter
   */
  reset() {
    this.requests = [];
  }

  /**
   * Gets current rate limit status
   * @returns {Object} Rate limit status information
   */
  getStatus() {
    return {
      maxRequests: this.maxRequests,
      remainingRequests: this.getRemainingRequests(),
      timeUntilReset: this.getTimeUntilReset(),
      windowMs: this.windowMs,
    };
  }
}

export default RateLimitManager;
