import { Card } from "@/components/ui/card";
import paperclipImg from "@/assets/paperclip.png";

interface StoryPageProps {
  pageNumber: number;
  prompt: string;
  imagePosition?: "left" | "right";
}

export const StoryPage = ({ pageNumber, prompt, imagePosition = "left" }: StoryPageProps) => {
  const writingLines = Array(6).fill(null);

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <Card className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-playful border-4 border-primary/20">
          {/* Page Number */}
          <div className="flex justify-between items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-magical flex items-center justify-center shadow-soft">
              <span className="font-bubblegum text-2xl text-white">{pageNumber}</span>
            </div>
          </div>

          {/* Content Grid */}
          <div className={`grid md:grid-cols-2 gap-8 ${imagePosition === "right" ? "md:flex-row-reverse" : ""}`}>
            {/* Image Box Section */}
            <div className={`space-y-6 ${imagePosition === "right" ? "md:order-2" : ""}`}>
              <div className="relative bg-gradient-to-br from-muted to-white rounded-2xl border-4 border-dashed border-primary/40 aspect-[3/4] flex items-center justify-center group hover:border-primary transition-colors">
                <img 
                  src={paperclipImg} 
                  alt="Paper clip" 
                  className="absolute -top-4 -right-4 w-12 h-12 rotate-45 opacity-70"
                />
                <div className="text-center space-y-2 opacity-50 group-hover:opacity-70 transition-opacity">
                  <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🖼️</span>
                  </div>
                  <p className="font-patrick text-xl text-muted-foreground">
                    Paste your picture here
                  </p>
                </div>
              </div>
              
              {/* Prompt Quote */}
              <Card className="p-6 bg-gradient-to-r from-secondary/10 to-primary/10 border-l-4 border-secondary">
                <p className="font-caveat text-2xl text-foreground leading-relaxed italic">
                  "{prompt}"
                </p>
              </Card>
            </div>

            {/* Writing Lines Section */}
            <div className={`space-y-4 ${imagePosition === "right" ? "md:order-1" : ""}`}>
              <div className="relative">
                <img 
                  src={paperclipImg} 
                  alt="Paper clip" 
                  className="absolute -top-4 -left-4 w-12 h-12 -rotate-12 opacity-70"
                />
              </div>
              
              {writingLines.map((_, index) => (
                <div key={index} className="border-b-2 border-primary/20 pb-2 pt-4 hover:border-primary/40 transition-colors">
                  <div className="h-8"></div>
                </div>
              ))}
              
              <p className="font-patrick text-lg text-muted-foreground italic pt-4">
                Continue your story...
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
