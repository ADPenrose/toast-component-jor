import React from "react";

// Since this is not a component, we cannot memoize it. However, the function that it receives as an argument can be memoized
// so that it is not recreated on every render.
function useKeydown(callback) {
  React.useEffect(() => {
    function handleKeydown(event) {
      if (event.key === "Escape") {
        callback(event);
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [callback]);
}

export default useKeydown;
