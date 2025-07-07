import React from 'react'
import { Button } from '@/components/ui/button'
import { Lightbulb, ThumbsUp, CheckCircle, AlertTriangle, AlertCircle, RefreshCw, Sparkles } from 'lucide-react'

interface SectionData {
  score: number
  comment?: string
}

interface AiReport {
  overall_score: number
  overall_feedback: string
  summary_comment?: string
  sections?: {
    contact_info?: SectionData
    experience?: SectionData
    education?: SectionData
    skills?: SectionData
  }
  tips_for_improvement?: string[]
  whats_good?: string[]
  needs_improvement?: string[]
}

interface ReportProps {
  aiReport?: AiReport
  loading: boolean
  onReanalyze: () => void
}

const Report: React.FC<ReportProps> = ({ aiReport, loading, onReanalyze }) => {
  const getCardBorder = (score: number) => {
    if (score >= 80) return 'border-t-2 border-l-2 border-green-400';
    if (score >= 60) return 'border-t-2 border-l-2 border-yellow-400';
    return 'border-t-2 border-l-2 border-red-400';
  };
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  const getFeedbackColor = (feedback: string) => {
    if (feedback?.toLowerCase().includes('excellent') || feedback?.toLowerCase().includes('strong')) return 'bg-yellow-100 text-gray-900';
    if (feedback?.toLowerCase().includes('needs improvement')) return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pt-6 pb-2 sticky top-0 z-10 bg-white border-b px-6">
        <h1 className="text-xl font-semibold text-gray-900">AI Analysis Results</h1>
        <Button onClick={onReanalyze} disabled={loading} variant="default" className="rounded-lg bg-black hover:bg-gray-800 text-white px-5 py-2 shadow-none text-sm font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 mr-1" />
          Re-analyze
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Overall Score Card */}
        <div className="rounded-xl shadow border border-gray-100 p-6 flex flex-col items-center mb-6 bg-gradient-to-bl from-[#ff5e69] to-[#b16cea] text-white">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-white/90">Overall Score</span>
          </div>
          {aiReport && (
            <>
              <div className="flex items-center gap-4 mb-1">
                <span className="text-5xl font-extrabold text-white drop-shadow">{aiReport.overall_score}</span>
                <span className="text-2xl text-white/70 font-bold">/100</span>
              </div>
              {aiReport.overall_feedback && (
                <div className="w-full mt-2 mb-2">
                  <span className="block text-xl font-bold text-white drop-shadow text-center">{aiReport.overall_feedback}</span>
                </div>
              )}
              {/* Progress Bar */}
              <div className="w-full mt-2 mb-2">
                <div className="w-full h-2 bg-white/30 rounded-full">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${aiReport.overall_score}%`,
                      background: 'white'
                    }}
                  />
                </div>
              </div>
              {aiReport.summary_comment && (
                <p className="text-white/90 italic text-center mt-2 text-sm drop-shadow">{aiReport.summary_comment}</p>
              )}
            </>
          )}
          {!aiReport && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white/80">Loading analysis...</p>
            </div>
          )}
        </div>

        {/* Section Cards 2x2 Grid */}
        {aiReport && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {([
              ['Contact Info', 'contact_info'],
              ['Experience', 'experience'],
              ['Education', 'education'],
              ['Skills', 'skills'],
            ] as const).map(([label, key]) => {
              const section = aiReport.sections?.[key];
              const score = section?.score ?? 0;
              // Border color for all four sides
              const baseBorder = score >= 80 ? 'border-green-400' : score >= 60 ? 'border-yellow-400' : 'border-red-400';
              const hoverBorder = score >= 80 ? 'hover:border-green-600' : score >= 60 ? 'hover:border-yellow-500' : 'hover:border-red-500';
              const scoreColor = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600';
              return (
                <div
                  key={label}
                  className={`bg-white rounded-xl border-2 ${baseBorder} ${hoverBorder} shadow-sm p-6 flex flex-col items-start transition-all duration-200 hover:shadow-lg hover:scale-[1.03] scrollbar-none`}
                  tabIndex={0}
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <span className="text-lg font-semibold text-gray-900 mb-1">{label}</span>
                  <span className={`text-4xl font-extrabold mb-1 ${scoreColor}`}>{section?.score !== undefined ? section.score + '%' : '--'}</span>
                  <span className="text-gray-700 mt-1 text-base leading-relaxed">{section?.comment}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Global Tips for Improvement */}
        {aiReport?.tips_for_improvement && aiReport.tips_for_improvement.length > 0 && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Global Tips for Improvement
            </h3>
            <ul className="space-y-2">
              {aiReport.tips_for_improvement.map((tip, index) => (
                <li key={index} className="text-blue-800 text-sm flex items-start gap-2">
                  <span className="text-blue-600 mt-1 font-bold">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* What's Good */}
        {aiReport?.whats_good && aiReport.whats_good.length > 0 && (
          <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
              <ThumbsUp className="w-5 h-5" />
              What's Good
            </h3>
            <ul className="space-y-2">
              {aiReport.whats_good.map((item, index) => (
                <li key={index} className="text-green-800 text-sm flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Needs Improvement */}
        {aiReport?.needs_improvement && aiReport.needs_improvement.length > 0 && (
          <div className="mt-6 bg-red-50 rounded-lg p-4 border border-red-200">
            <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Needs Improvement
            </h3>
            <ul className="space-y-2">
              {aiReport.needs_improvement.map((item, index) => (
                <li key={index} className="text-red-800 text-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Report