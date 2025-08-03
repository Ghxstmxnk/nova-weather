import { Cloud } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Cloud className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
        <div className="text-xl font-semibold text-foreground mb-2">Loading Weather Data</div>
        <div className="text-muted-foreground">Please wait while we fetch the latest information...</div>
        
        {/* Loading animation */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};