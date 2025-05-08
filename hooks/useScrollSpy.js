// hooks/useScrollSpy.js
import { useEffect, useState } from 'react';

// ids: array of section IDs to watch (e.g. ['features','howitworks',...])
// offset: how many pixels from top to trigger (e.g. navbar height)
export default function useScrollSpy(ids, offset = 0) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: `-${offset}px 0px -80% 0px` }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
