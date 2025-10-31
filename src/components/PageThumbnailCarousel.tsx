import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface PageThumbnail {
  id: string;
  label: string;
  pageNumber: number;
}

interface PageThumbnailCarouselProps {
  currentPage: number;
  totalPages: number;
  onPageClick: (pageIndex: number) => void;
  onPagesReorder: (newOrder: number[]) => void;
}

interface SortableThumbnailProps {
  thumbnail: PageThumbnail;
  isActive: boolean;
  onClick: () => void;
}

const SortableThumbnail = ({ thumbnail, isActive, onClick }: SortableThumbnailProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: thumbnail.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex-shrink-0 w-16 h-20 rounded-lg border-2 cursor-pointer transition-all touch-none",
        isActive
          ? "border-primary shadow-lg scale-110"
          : "border-border hover:border-primary/50",
        isDragging && "opacity-50 scale-105"
      )}
      onClick={onClick}
    >
      <div className="w-full h-full rounded-md bg-gradient-subtle flex flex-col items-center justify-center p-1">
        <div className="w-8 h-8 bg-white/80 rounded mb-1 flex items-center justify-center">
          <span className="text-xs font-bubblegum text-primary">
            {thumbnail.pageNumber}
          </span>
        </div>
        <span className="text-[8px] font-medium text-foreground/70 text-center truncate w-full px-1">
          {thumbnail.label}
        </span>
      </div>
    </div>
  );
};

export const PageThumbnailCarousel = ({
  currentPage,
  totalPages,
  onPageClick,
  onPagesReorder,
}: PageThumbnailCarouselProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [thumbnails, setThumbnails] = useState<PageThumbnail[]>(
    Array.from({ length: totalPages }, (_, i) => ({
      id: `page-${i}`,
      label: i === 0 ? "Cover" : i === 1 ? "Instructions" : i === 2 ? "Builder" : `Story ${i - 2}`,
      pageNumber: i + 1,
    }))
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = thumbnails.findIndex((t) => t.id === active.id);
      const newIndex = thumbnails.findIndex((t) => t.id === over.id);

      const newThumbnails = arrayMove(thumbnails, oldIndex, newIndex);
      setThumbnails(newThumbnails);

      // Map back to original page indices
      const newOrder = newThumbnails.map((t) => t.pageNumber - 1);
      onPagesReorder(newOrder);
    }
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <span className="font-bubblegum text-sm">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="gap-2"
          >
            <ChevronUp className="h-4 w-4" />
            Show Pages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bubblegum text-sm">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(false)}
            className="gap-2"
          >
            <ChevronDown className="h-4 w-4" />
            Hide
          </Button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={thumbnails.map((t) => t.id)}
            strategy={horizontalListSortingStrategy}
          >
            <ScrollArea className="w-full">
              <div className="flex gap-3 pb-2">
                {thumbnails.map((thumbnail, index) => (
                  <SortableThumbnail
                    key={thumbnail.id}
                    thumbnail={thumbnail}
                    isActive={currentPage === index}
                    onClick={() => onPageClick(index)}
                  />
                ))}
                
                <Button
                  variant="outline"
                  className="flex-shrink-0 w-16 h-20 rounded-lg border-2 border-dashed border-primary/30 hover:border-primary/60"
                  onClick={() => {
                    // Add new page functionality can be implemented later
                    console.log("Add new page");
                  }}
                >
                  <Plus className="h-6 w-6 text-primary/50" />
                </Button>
              </div>
              <ScrollBar 
                orientation="horizontal" 
                className="h-2"
              />
            </ScrollArea>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
