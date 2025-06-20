import { useEffect } from "react";

export const ScrollToTop = () => {
  debugger
  useEffect(() => {
    const el = document.getElementsByClassName("custom-sidebar")[0];
    if (el) el.scrollTo(0, 0);
  }, []);

  return null;
}
