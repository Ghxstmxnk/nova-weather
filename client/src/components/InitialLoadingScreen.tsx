import { Cloud, Wind, Droplets, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

interface InitialLoadingScreenProps {
  onComplete: () => void;
}

export const InitialLoadingScreen = ({ onComplete }: InitialLoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Cloud, text: "Initializing Atmoscope" },
    { icon: Wind, text: "Connecting to weather services" },
    { icon: Droplets, text: "Gathering atmospheric data" },
    { icon: Sun, text: "Preparing your dashboard" }
  ];

  useEffect(() => {
    const duration = 3000; // 3 seconds total
    const stepDuration = duration / steps.length;
    const incrementInterval = 50; // Update every 50ms
    const incrementSize = 100 / (duration / incrementInterval);

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + incrementSize;
        const newStep = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(newStep, steps.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Small delay before completing
          return 100;
        }
        return newProgress;
      });
    }, incrementInterval);

    return () => clearInterval(interval);
  }, [onComplete]);

  const CurrentIcon = steps[currentStep]?.icon || Cloud;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-[100] flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Loading content */}
      <div className="relative z-10 text-center px-8 max-w-md">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl animate-bounce">
            <Cloud className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Atmoscope</h1>
          <p className="text-blue-200">Professional Weather Analytics</p>
        </div>

        {/* Current step */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CurrentIcon className="w-6 h-6 text-blue-300 animate-pulse" />
            <span className="text-blue-100 text-lg font-medium">
              {steps[currentStep]?.text}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-blue-200 text-sm mt-2">{Math.round(progress)}%</p>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-blue-400 scale-125' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};