import { useState, useEffect, useCallback, useRef } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useRef to keep latest url for retry
  const urlRef = useRef(url);

  // wrapped fetch so component using hook can call refresh (if needed)
  const fetchData = useCallback(async (signal) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(urlRef.current, { signal });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status} - ${res.statusText} ${text}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      // If aborted, do nothing (optional: set error to null)
      if (err.name === 'AbortError') {
        // fetch aborted, keep previous state
        console.log('Fetch aborted');
      } else {
        setError(err);
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // initial + url change effect
  useEffect(() => {
    urlRef.current = url;
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [url, fetchData]);

  // convenience: a retry function triggered by UI
  const retry = useCallback(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    // not keeping controller to abort retry; it's a simple one-shot
  }, [fetchData]);

  return { data, loading, error, retry };
}
