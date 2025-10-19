import { useState } from "react";
import { CoverPage } from "@/components/CoverPage";
import { InstructionsPage } from "@/components/InstructionsPage";
import { StoryBuilderPage } from "@/components/StoryBuilderPage";
import { StoryPage } from "@/components/StoryPage";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const storyPrompts = [
    "Hey there… who's that with the bouncy curls and sparkly eyes?",
    "Psst… did you spot that shy little whiskered fellow peeking from behind the reeds?",
    "Uh-oh… what's this? A trickle where a rushing creek once flowed?",
    "Wait—did those glowing pebbles just… dim?",
    "A secret map? A whispered legend? Or just a really good guess?",
    "Shh… hear that hum in the air? Something magical might be close!",
    "Oops! A sudden splash—did Finn just set something off?"
  ];

  const pages = [
    <CoverPage key="cover" />,
    <InstructionsPage key="instructions" />,
    <StoryBuilderPage key="builder" />,
    ...storyPrompts.map((prompt, index) => (
      <StoryPage 
        key={`story-${index}`}
        pageNumber={index + 1}
        prompt={prompt}
        imagePosition={index % 2 === 0 ? "left" : "right"}
      />
    ))
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative">
      {pages[currentPage]}
      <Navigation 
        currentPage={currentPage}
        totalPages={pages.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </main>
  );
};

export default Index;
