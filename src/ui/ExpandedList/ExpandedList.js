import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import { AppearanceAnimation, EntranceAnimation } from 'src/animation';

const getMaxVisibleItems = (containerWidth) => {
  if (containerWidth < 300) return 1;  
  if (containerWidth < 500) return 2;  
  return 3;
};

export const ExpandedList = ({ list, item }) => {
  const [expanded, setExpanded] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  const maxVisibleItems = expanded ? list.length : getMaxVisibleItems(containerWidth);
  const visibleItems = list.slice(0, maxVisibleItems);
  const remainingItems = list.length - maxVisibleItems;

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const newWidth = entries[0].contentRect.width;
        setContainerWidth(newWidth);
      }
    });

    const container = containerRef.current;
    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

	const renderListItem = useCallback((listItem, index) => (
		<EntranceAnimation animationDelay={0.2} key={`${listItem}${index}`}>
      {item(listItem)}
		</EntranceAnimation>
  ), [item]);


  return (
    <Box ref={containerRef} display='flex' flexWrap='wrap' gap={1} sx={{ overflow: 'hidden', width: '100%'}}>
			<AppearanceAnimation sx={{width: '100%'}}>
				<Box display="flex" flexWrap="wrap" alignItems='center' gap={1}  >
					{visibleItems.map(renderListItem)}
					<Box 
						onClick={() => setExpanded(prev => !prev)} 
						sx={{direction: 'ltr', cursor: 'pointer'}}
					>
						{!expanded && remainingItems > 0  ? `+${remainingItems} more` : 'Show Less' }
					</Box>
				</Box>
			</AppearanceAnimation>
    </Box>
  );
};
