import { Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-glass-bg backdrop-blur-sm border-t border-glass-border py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Developed by</span>
            <a 
              href="https://www.linkedin.com/in/l-sneha-b66205295/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <Linkedin className="w-4 h-4" />
              Sneha
            </a>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2025 Atmoscope. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};