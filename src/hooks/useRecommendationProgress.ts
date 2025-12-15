import { useState, useEffect } from 'react';

interface ProgressItem {
  id: string;
  completed: boolean;
  completedDate?: number;
}

const STORAGE_KEY = 'recommendationProgress';

export function useRecommendationProgress() {
  const [progress, setProgress] = useState<Record<string, ProgressItem>>({});

  // Load progress from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: Record<string, ProgressItem>) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  // Toggle completion status
  const toggleComplete = (id: string) => {
    const newProgress = { ...progress };
    if (newProgress[id]) {
      newProgress[id] = {
        ...newProgress[id],
        completed: !newProgress[id].completed,
        completedDate: !newProgress[id].completed ? Date.now() : undefined
      };
    } else {
      newProgress[id] = {
        id,
        completed: true,
        completedDate: Date.now()
      };
    }
    saveProgress(newProgress);
  };

  // Check if item is completed
  const isCompleted = (id: string): boolean => {
    return progress[id]?.completed || false;
  };

  // Get completion percentage for a category
  const getCompletionPercentage = (ids: string[]): number => {
    if (ids.length === 0) return 0;
    const completed = ids.filter(id => isCompleted(id)).length;
    return Math.round((completed / ids.length) * 100);
  };

  // Reset all progress
  const resetProgress = () => {
    saveProgress({});
  };

  return {
    toggleComplete,
    isCompleted,
    getCompletionPercentage,
    resetProgress
  };
}
