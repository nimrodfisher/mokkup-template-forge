
import { useState, useCallback } from 'react';

interface RateLimiterOptions {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
}

export function useRateLimiter(options: RateLimiterOptions) {
  const [attempts, setAttempts] = useState<number[]>([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockUntil, setBlockUntil] = useState<number | null>(null);

  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    
    // Check if currently blocked
    if (blockUntil && now < blockUntil) {
      return false;
    }
    
    if (blockUntil && now >= blockUntil) {
      setIsBlocked(false);
      setBlockUntil(null);
      setAttempts([]);
    }

    // Filter attempts within the time window
    const recentAttempts = attempts.filter(
      attemptTime => now - attemptTime < options.windowMs
    );

    // Check if limit exceeded
    if (recentAttempts.length >= options.maxAttempts) {
      setIsBlocked(true);
      const blockDuration = options.blockDurationMs || options.windowMs * 2;
      setBlockUntil(now + blockDuration);
      return false;
    }

    // Add current attempt
    const newAttempts = [...recentAttempts, now];
    setAttempts(newAttempts);
    
    return true;
  }, [attempts, blockUntil, options]);

  const getRemainingTime = useCallback(() => {
    if (!blockUntil) return 0;
    return Math.max(0, blockUntil - Date.now());
  }, [blockUntil]);

  const reset = useCallback(() => {
    setAttempts([]);
    setIsBlocked(false);
    setBlockUntil(null);
  }, []);

  return {
    checkRateLimit,
    isBlocked,
    getRemainingTime,
    reset,
    attemptsRemaining: Math.max(0, options.maxAttempts - attempts.length)
  };
}
