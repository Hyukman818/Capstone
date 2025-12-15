import { Exercise } from '../../data/exerciseDatabase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Clock, Flame, Repeat, Timer, Target, AlertCircle, Play } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
}

function getDifficultyColor(difficulty: Exercise['difficulty']) {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'advanced':
      return 'bg-red-100 text-red-700 border-red-200';
  }
}

function getDifficultyLabel(difficulty: Exercise['difficulty']) {
  switch (difficulty) {
    case 'beginner':
      return '초급';
    case 'intermediate':
      return '중급';
    case 'advanced':
      return '고급';
  }
}

function getTypeLabel(type: Exercise['type']) {
  switch (type) {
    case 'cardio':
      return '유산소';
    case 'strength':
      return '근력';
    case 'flexibility':
      return '유연성';
  }
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <div className="bg-white rounded-xl border border-green-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-gray-900 font-semibold text-base flex-1">{exercise.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(exercise.difficulty)}`}>
            {getDifficultyLabel(exercise.difficulty)}
          </span>
        </div>
        <p className="text-sm text-gray-700 mb-4 leading-relaxed">{exercise.description}</p>

        {/* Exercise Info Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-green-700 bg-white/70 rounded-lg px-3 py-2.5 min-w-0">
            <Flame className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
            <span className="font-semibold text-sm whitespace-nowrap">{exercise.calories} kcal</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 bg-white/70 rounded-lg px-3 py-2.5 min-w-0">
            <Target className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
            <span className="text-sm font-medium whitespace-nowrap">{getTypeLabel(exercise.type)}</span>
          </div>
          {exercise.sets && exercise.reps && (
            <div className="flex items-center gap-2 text-gray-700 bg-white/70 rounded-lg px-3 py-2.5 min-w-0">
              <Repeat className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
              <span className="text-sm whitespace-nowrap">{exercise.sets}세트 × {exercise.reps}회</span>
            </div>
          )}
          {exercise.duration && (
            <div className="flex items-center gap-2 text-gray-700 bg-white/70 rounded-lg px-3 py-2.5 min-w-0">
              <Clock className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
              <span className="text-sm whitespace-nowrap">{exercise.duration}분</span>
            </div>
          )}
          {exercise.rest > 0 && (
            <div className="flex items-center gap-2 text-gray-700 bg-white/70 rounded-lg px-3 py-2.5 col-span-2 min-w-0">
              <Timer className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
              <span className="text-sm whitespace-nowrap">휴식 {exercise.rest}초</span>
            </div>
          )}
        </div>
      </div>

      {/* Target Muscles */}
      <div className="p-4 bg-green-50/50 border-b border-green-100">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">타겟 근육</h4>
        <div className="flex flex-wrap gap-2">
          {exercise.targetMuscles.map((muscle, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-white text-green-700 text-xs font-medium rounded-full border border-green-200"
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>

      {/* Exercise Details (Accordion) */}
      <Accordion type="single" collapsible className="px-4 pb-4">
        <AccordionItem value="details" className="border-none">
          <AccordionTrigger className="text-sm text-green-700 hover:text-green-800 py-3">
            운동 방법 보기
          </AccordionTrigger>
          <AccordionContent>
            {/* Instructions */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">운동 방법</h4>
              <ol className="space-y-2">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="text-xs text-gray-700 leading-relaxed flex items-start">
                    <span className="text-green-600 font-semibold mr-2 min-w-[20px]">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Video Link */}
            {exercise.videoUrl && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-green-600" />
                  <a
                    href={exercise.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-700 hover:text-green-800 font-medium"
                  >
                    동영상 가이드 보기
                  </a>
                </div>
              </div>
            )}

            {/* Precautions */}
            {exercise.precautions.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  <h4 className="text-sm font-semibold text-gray-900">주의사항</h4>
                </div>
                <ul className="space-y-1.5">
                  {exercise.precautions.map((precaution, index) => (
                    <li key={index} className="text-xs text-gray-700 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span>{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {exercise.tags.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {exercise.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
