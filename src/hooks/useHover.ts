import { useState, useEffect, useMemo, useCallback } from 'react';
import { useHover } from 'use-events';

export default () => {
  const [isHovered, { onMouseEnter, onMouseLeave: onMouseLeaveCallback }] = useHover();
  const [hasHovered, setHasHovered] = useState(false);
  const [hasHoveredAway, setHasHoveredAway] = useState(false);

  const onMouseLeave = useCallback((e) => {
    onMouseLeaveCallback(e);
    setHasHoveredAway(true);
  }, [onMouseLeaveCallback, setHasHoveredAway]);

  const hoverClasses = useMemo(() => {
    if (isHovered) {
      return 'on-mouse-enter';
    }

    if ((!isHovered && hasHovered) || hasHoveredAway) {
      return 'on-mouse-leave';
    }
  }, [isHovered, hasHovered, hasHoveredAway]);

  useEffect(() => {
    setHasHovered(hasHovered || isHovered);
  }, [isHovered, hasHovered]);

  return {
    isHovered,
    hasHovered,
    hasHoveredAway,
    onMouseEnter,
    onMouseLeave,
    hoverClasses
  };
}
