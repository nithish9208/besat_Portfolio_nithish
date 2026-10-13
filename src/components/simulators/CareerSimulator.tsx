import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  CheckCircle, 
  AlertCircle, 
  BookOpen, 
  Clock, 
  MapPin, 
  Award, 
  ChevronRight, 
  Info,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  CareerInputs, 
  CareerSimulationResult 
} from '../../types/simulations';
import { 
  EDUCATION_LEVELS, 
  TN_DISTRICTS, 
  CAREER_DOMAINS, 
  INDUSTRY_SECTORS, 
  ALL_SKILLS_LIST, 
  CAREER_ROLES_TAXONOMY, 
  DISTRICT_DEMAND_DATA,
  DEFAULT_CAREER_INPUTS, 
  SAMPLE_CAREER_SCENARIO, 
  runCareerSimulation, 
  exportCareerSimulationCSV 
} from '../../utils/careerEngine';
import { SimulationSharedHeader } from './SimulationSharedHeader';

export const CareerSimulator: React.FC = () => {
  const [inputs, setInputs] = useState<CareerInputs>(DEFAULT_CAREER_INPUTS);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CareerSimulationResult>(() => runCareerSimulation(DEFAULT_CAREER_INPUTS));
  const [showLogic, setShowLogic] = useState(false);

  const toggleSkill = (skill: string) => {
    setInputs(prev => {
      const exists = prev.currentSkills.includes(skill);
      const updated = exists 
        ? prev.currentSkills.filter(s => s !== skill)
        : [...prev.currentSkills, skill];
      return { ...prev, currentSkills: updated };
    });
  };

  const toggleInterest = (domain: string) => {
    setInputs(prev => {
      const exists = prev.careerInterests.includes(domain);
      let updated: string[];
      if (exists) {
        if (prev.careerInterests.length === 1) return prev; // keep at least 1
        updated = prev.careerInterests.filter(d => d !== domain);
      } else {
        updated = [...prev.careerInterests, domain];
      }
      return { ...prev, careerInterests: updated };
    });
  };

  const handleRunSimulation = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const res = runCareerSimulation(inputs);
      setResult(res);
      setIsCalculating(false);
    }, 380);
  };

  const handleReset = () => {
    setInputs(DEFAULT_CAREER_INPUTS);
    setResult(runCareerSimulation(DEFAULT_CAREER_INPUTS));
  };

  const handleSampleScenario = () => {
    setInputs(SAMPLE_CAREER_SCENARIO);
    setResult(runCareerSimulation(SAMPLE_CAREER_SCENARIO));
  };

  const handleExportCSV = () => {
    exportCareerSimulationCSV(result);
  };

  const topRole = result.recommendedPaths[0];

  return (
    <div className="space-y-6">
      <SimulationSharedHeader
        title="AI-Based Career & Skill Training Finder"
        subtitle="Transparent Rule-Based Pathway Recommender & Regional Skill-Gap Engine"
        tagline="Calculates weighted Career-Fit Scores by evaluating candidate credentials against regional industry hiring demands across Tamil Nadu districts."
        badgeText="Rule-Based Algorithmic Prototype"
        badgeType="prototype"
        isCalculating={isCalculating}
        onRunSimulation={handleRunSimulation}
        onReset={handleReset}
        onSampleScenario={handleSampleScenario}
        onExportCSV={handleExportCSV}
        runButtonLabel="Analyze Fit & Pathways"
      />

      {/* Grid: Inputs & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Profile Builder */}
        <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              Learner Profile Setup
            </h3>
            <span className="text-xs text-slate-400 font-mono">Configurable Weights</span>
          </div>

          {/* Education Level */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Highest Education Level</label>
            <select
              value={inputs.educationLevel}
              onChange={e => setInputs(prev => ({ ...prev, educationLevel: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
            >
              {EDUCATION_LEVELS.map(lvl => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>

          {/* Selected District */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Target District / Hub</label>
            <select
              value={inputs.district}
              onChange={e => setInputs(prev => ({ ...prev, district: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
            >
              {TN_DISTRICTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Preferred Industry */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Industry Sector</label>
            <select
              value={inputs.preferredIndustry}
              onChange={e => setInputs(prev => ({ ...prev, preferredIndustry: e.target.value }))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
            >
              {INDUSTRY_SECTORS.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Career Interests Multi-select */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Career Interests (Select 1 or more)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CAREER_DOMAINS.map(domain => {
                const isSelected = inputs.careerInterests.includes(domain);
                return (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => toggleInterest(domain)}
                    className={`text-[11px] px-2.5 py-1 rounded-md border transition-all ${
                      isSelected
                        ? 'bg-purple-500/20 border-purple-500 text-purple-300 font-semibold'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    {domain}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Skills Selector */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-slate-300">
                Current Skills ({inputs.currentSkills.length} selected)
              </label>
              <button
                type="button"
                onClick={() => setInputs(prev => ({ ...prev, currentSkills: [] }))}
                className="text-[10px] text-slate-400 hover:text-rose-400"
              >
                Clear all
              </button>
            </div>
            <div className="max-h-36 overflow-y-auto p-2 bg-slate-950/70 border border-slate-800 rounded-lg flex flex-wrap gap-1.5">
              {ALL_SKILLS_LIST.map(skill => {
                const isChecked = inputs.currentSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                      isChecked
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-medium'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {isChecked ? '✓ ' : '+ '}{skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Available Duration */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Available Training Commitment: {inputs.availableDurationMonths} Months ({inputs.availableDurationMonths * 4} Weeks)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 3, 6].map(dur => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setInputs(prev => ({ ...prev, availableDurationMonths: dur }))}
                  className={`py-1.5 text-xs rounded-lg border transition-all text-center ${
                    inputs.availableDurationMonths === dur
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300 font-semibold'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {dur} {dur === 1 ? 'Month' : 'Months'}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={isCalculating}
            className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isCalculating ? 'Computing Fit Weights...' : 'Analyze Fit & Generate Pathway'}
          </button>
        </div>

        {/* Right: Recommendation Results */}
        <div className="lg:col-span-8 space-y-5">
          {/* Top KPI Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Top Career Match</span>
              <div className="text-sm font-bold text-white truncate tracking-tight" title={topRole.title}>
                {topRole.title}
              </div>
              <div className="mt-1 text-[11px] text-purple-400 font-medium">
                {topRole.domain}
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Career-Fit Score</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-cyan-400 tracking-tight">{topRole.fitScore}%</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                Skill Match: {topRole.skillMatchPct}%
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Missing Core Skills</span>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-xl font-bold tracking-tight ${topRole.missingCriticalSkills.length === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {topRole.missingCriticalSkills.length}
                </span>
                <span className="text-xs text-slate-400">toolsets</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                {topRole.missingCriticalSkills.length === 0 ? 'Interview Ready' : 'Targeted Gaps'}
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block mb-1">Estimated Pathway</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-indigo-400 tracking-tight">{topRole.trainingPathwayWeeks}</span>
                <span className="text-xs text-slate-400">Weeks</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                {topRole.recommendedCourses.length} Learning Modules
              </div>
            </div>
          </div>

          {/* Automated Insight */}
          <div className="bg-slate-900/90 border border-purple-500/30 rounded-xl p-4 shadow-md bg-gradient-to-r from-purple-950/20 to-transparent">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 mt-0.5 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-0.5">
                  Recommendation Synthesis
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.automatedInsight}
                </p>
              </div>
            </div>
          </div>

          {/* Top 3 Ranked Career Cards */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
              Ranked Recommended Pathways ({result.recommendedPaths.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {result.recommendedPaths.map((path, idx) => (
                <div 
                  key={path.id}
                  className={`rounded-xl p-4 border transition-all ${
                    idx === 0 
                      ? 'bg-slate-900/90 border-purple-500/40 shadow-lg shadow-purple-950/20' 
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      Rank #{idx + 1}
                    </span>
                    <span className="text-xs font-extrabold text-cyan-400 font-mono">
                      {path.fitScore}% Fit
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-white mb-1 leading-snug">{path.title}</h5>
                  <p className="text-[11px] text-slate-400 mb-2">{path.domain}</p>

                  <div className="space-y-1.5 text-[11px] pt-2 border-t border-slate-800/80">
                    <div className="flex justify-between text-slate-400">
                      <span>Skill Match:</span>
                      <span className="text-slate-200 font-medium">{path.skillMatchPct}%</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>District Hiring:</span>
                      <span className="text-emerald-400 font-medium">{path.districtDemandLevel}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Salary Tier:</span>
                      <span className="text-slate-300 text-[10px]">{path.salaryBenchmarkTier.split('(')[0]}</span>
                    </div>
                  </div>

                  {path.missingCriticalSkills.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] text-slate-500 block mb-1">Missing to Master:</span>
                      <div className="flex flex-wrap gap-1">
                        {path.missingCriticalSkills.slice(0, 3).map(sk => (
                          <span key={sk} className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Skill Gap Analysis: Current vs Target Role */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  Target Role Skill Gap Analysis — {topRole.title}
                </h4>
                <p className="text-xs text-slate-400">Learner competency readiness level vs expected industry mastery</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-3 h-3 rounded-full bg-slate-600"></span> Expected Requirement
                </span>
                <span className="flex items-center gap-1.5 text-cyan-300 font-medium">
                  <span className="w-3 h-3 rounded-full bg-cyan-400"></span> Learner Competency
                </span>
              </div>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.radarSkillsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="skill" stroke="#64748b" tick={{ fontSize: 10 }} interval={0} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                  />
                  <Bar dataKey="targetRoleRequirement" name="Target Requirement" fill="#334155" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="learnerLevel" name="Learner Level" fill="#06b6d4" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommended Courses & Eligibility Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Recommended Learning Modules */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                Structured Upskilling Modules ({topRole.recommendedCourses.length})
              </h4>
              <div className="space-y-2.5">
                {topRole.recommendedCourses.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-medium text-slate-200">{c.name}</span>
                      <span className="text-[10px] text-cyan-400 whitespace-nowrap bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800/40">
                        {c.durationWeeks} Weeks
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Focus: {c.focus}</p>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Provider: {c.providerType}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility & Feasibility Checklist */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Eligibility & Readiness Audit
              </h4>
              <div className="space-y-2.5">
                {result.eligibilityChecklist.map((chk, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-200">{chk.criterion}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        chk.status === 'passed' ? 'bg-emerald-500/10 text-emerald-400' :
                        chk.status === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {chk.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{chk.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Methodology Accordion */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowLogic(!showLogic)}
              className="w-full p-3.5 text-left flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4 text-purple-400" />
                How are Career-Fit Scores calculated? (Recommendation Weights & Logic)
              </span>
              <ChevronRight className={`w-4 h-4 transition-transform ${showLogic ? 'rotate-90' : ''}`} />
            </button>
            {showLogic && (
              <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-300 space-y-2.5">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[11px] font-semibold text-purple-400 block mb-1">Weighted Recommendation Formula</span>
                  <code className="text-purple-300 block bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[11px] mb-1.5">
                    CareerFitScore = (SkillAlignment * 0.50) + (EligibilityScore * 0.20) + (InterestMatch * 0.15) + (DistrictIndustryRelevance * 0.15)
                  </code>
                  <p className="text-[11px] text-slate-400">
                    The engine uses deterministic multi-criteria scoring to provide transparent upskilling pathways. Missing skills directly determine the training pathway duration.
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <strong className="text-slate-200">Prototype Disclaimer:</strong> Curriculums and regional weights are modeled for prototyping purposes and do not represent contractual hiring guarantees or real-time live job postings.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
