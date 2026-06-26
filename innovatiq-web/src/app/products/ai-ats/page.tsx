import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import CtaSection from '@/components/home/CtaSection';
import {
  CheckCircle2,
  ArrowRight,
  Bot,
  Star,
  Upload,
  Pin,
  FolderOpen,
  User,
  Lock,
  MessageSquare,
  Bell,
  Key,
  ClipboardList,
  Rocket,
  Search,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  Pause,
  Info,
  FileText,
  Calendar,
  Target,
  BarChart3,
  Users,
  Settings
} from 'lucide-react';
import Link from 'next/link';

const COLOR = '#BE123C';
const GRADIENT = 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)';

const overviewHighlights = [
  'AI resume parsing that extracts candidate details from CVs automatically',
  'AI fitment scoring ranks candidates against requirements instantly',
  'One-click client submission with auto-generated profile summaries',
  'Visual Kanban pipeline board — drag, drop, and track every stage',
  'Automatic stale pipeline alerts so nothing sits forgotten',
  'Role-based access for Super Admins, Managers, and Recruiters',
];

const overviewFeaturePills = [
  { Icon: Bot, title: 'AI Resume Parsing & Screening' },
  { Icon: Star, title: 'AI Candidate Matching & Ranking' },
  { Icon: FileText, title: 'AI Job Description Generator' },
  { Icon: Target, title: 'Candidate Fit Analysis' },
  { Icon: Users, title: 'AI Talent Pool Recommendations' },
  { Icon: Calendar, title: 'AI Interview Scheduling Assistance' },
];

const candidateFeatures = [
  { Icon: Bot, title: 'AI Resume Parsing', desc: 'Upload CVs in bulk and let AI extract candidate details automatically — skills, experience, education, and contact information — ready to review and save.' },
  { Icon: FolderOpen, title: 'Candidate Database', desc: 'A single shared pool accessible to every recruiter. Search, filter, and export candidate lists without duplicating records or losing track of profiles.' },
  { Icon: User, title: '360° Candidate Profile', desc: "Every candidate's full history in one place — CVs, pipeline activity across all requirements, notes, and a complete audit trail." },
  { Icon: Lock, title: 'Duplicate Prevention', desc: 'Automatic detection prevents the same candidate being added twice, keeping your database clean from the first day.' },
];

const pipelineFeatures = [
  { Icon: Pin, title: 'Visual Kanban Pipeline', desc: "Drag and drop candidates across hiring stages on a visual board. See every requirement's pipeline at a glance — who's moving, who's stalled." },
  { Icon: Star, title: 'AI Fitment Scoring', desc: 'Every candidate gets an AI-calculated match score against the open requirement — based on skills, experience, location, and availability. Sort by score to shortlist faster.' },
  { Icon: Upload, title: 'One-Click Client Submission', desc: 'Select candidates, review your shortlist, and submit to the client with one action. The system generates and sends a formatted profile summary automatically.' },
  { Icon: MessageSquare, title: 'Client Feedback Tracking', desc: 'Log client responses per candidate and keep the pipeline moving. All feedback is timestamped and attributed to the recruiter who recorded it.' },
  { Icon: Bell, title: 'Stale Pipeline Alerts', desc: 'Candidates with no movement get flagged automatically, so nothing sits forgotten in the pipeline.' },
];

const pipelineStages = [
  { label: 'Applied', type: 'active' },
  { label: 'Screened', type: 'active' },
  { label: 'Shortlisted', type: 'active' },
  { label: 'Submitted to Client', type: 'active' },
  { label: 'Client Shortlisted', type: 'active' },
  { label: 'Interview Scheduled', type: 'active' },
  { label: 'Interview Completed', type: 'active' },
  { label: 'Selected', type: 'active' },
  { label: 'Offer Released', type: 'active' },
  { label: 'Joined', type: 'won' },
];

const terminalStages = [
  { label: 'Rejected', type: 'lost', desc: 'Can occur at any stage' },
  { label: 'On Hold', type: 'neutral', desc: 'Can occur at any stage' },
];

const roles = [
  { Icon: Key, title: 'Super Admin', desc: 'Full system control — organisation setup, user management, and configuration.' },
  { Icon: ClipboardList, title: 'Recruitment Manager', desc: 'Full visibility across all recruiters. Approves shortlists, monitors pipelines, and runs reports.' },
  { Icon: Search, title: 'Recruiter', desc: 'Manages candidates and works requirements assigned to them.' },
];

const idealFor = [
  'Recruitment firms and staffing agencies',
  'In-house talent acquisition teams managing multiple open roles simultaneously',
  'HR teams replacing email and spreadsheet-based hiring workflows',
  'Organisations that need AI-ranked shortlists before client or hiring manager review',
];

const stageColors: Record<string, { bg: string; border: string; text: string }> = {
  active:  { bg: `${COLOR}10`, border: COLOR, text: COLOR },
  neutral: { bg: 'rgba(100,116,139,0.08)', border: '#94A3B8', text: '#64748B' },
  won:     { bg: 'rgba(16,185,129,0.10)', border: '#10B981', text: '#059669' },
  lost:    { bg: 'rgba(239,68,68,0.10)', border: '#EF4444', text: '#DC2626' },
};

const DESKTOP_ORDERS = [
  'lg:order-1',
  'lg:order-2',
  'lg:order-3',
  'lg:order-4',
  'lg:order-5',
  'lg:order-10',
  'lg:order-9',
  'lg:order-8',
  'lg:order-7',
  'lg:order-6'
];

const TABLET_ORDERS = [
  'sm:order-1',
  'sm:order-2',
  'sm:order-4',
  'sm:order-3',
  'sm:order-5',
  'sm:order-6',
  'sm:order-8',
  'sm:order-7',
  'sm:order-9',
  'sm:order-10'
];

const getDesktopDirection = (i: number) => {
  if (i === 4) return 'Down';
  return i < 4 ? 'Right' : 'Left';
};

const getTabletDirection = (i: number) => {
  if (i % 2 === 1) return 'Down';
  return Math.floor(i / 2) % 2 === 0 ? 'Right' : 'Left';
};


export default function AIATSPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flowRight {
          0% { transform: translateX(-10px); opacity: 0.2; }
          50% { opacity: 1; }
          100% { transform: translateX(4px); opacity: 0.2; }
        }
        @keyframes flowLeft {
          0% { transform: translateX(10px); opacity: 0.2; }
          50% { opacity: 1; }
          100% { transform: translateX(-4px); opacity: 0.2; }
        }
        @keyframes flowDown {
          0% { transform: translateY(-10px); opacity: 0.2; }
          50% { opacity: 1; }
          100% { transform: translateY(4px); opacity: 0.2; }
        }
        .animate-flow-right {
          animation: flowRight 1.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-flow-left {
          animation: flowLeft 1.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-flow-down {
          animation: flowDown 1.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}} />
      <PageHero badge="AI-ATS / HRMS" title="From CV to Placement. Faster. Smarter." subtitle="Innovatiq AI-ATS gives recruitment teams a single AI-powered platform to manage candidates, track hiring pipelines, and submit shortlists to clients — without the spreadsheets." />

      {/* Overview — matches ProductPageTemplate layout */}
      <section className="relative pt-8 pb-24 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${COLOR}08 0%, transparent 60%)` }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(244,63,94,0.04) 0%, transparent 60%)' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Design.svg" alt="" aria-hidden="true"
          className="absolute right-0 bottom-0 h-[65%] max-h-105 w-auto opacity-[0.12] pointer-events-none select-none object-contain" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
                style={{ color: COLOR, background: '#FFFFFF', borderColor: COLOR, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR }} />
                Product Overview
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                AI-ATS —{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                  AI-Powered Recruitment Platform
                </span>
              </h2>
              <p className="text-[17px] font-medium leading-relaxed mb-4" style={{ color: '#1a1a1a' }}>
                Recruitment teams lose hours every week managing candidates across email, spreadsheets, and separate tools. Innovatiq AI-ATS consolidates everything — a shared candidate database, an intelligent pipeline board, and automated client submission workflows — into one platform built for how recruitment teams actually work.
              </p>
              <p className="text-[17px] font-medium leading-relaxed mb-8" style={{ color: '#1a1a1a' }}>
                AI does the heavy lifting: parsing CVs, scoring candidates against requirements, and flagging profiles that need attention. Your recruiters focus on relationships, not administration.
              </p>
              <div className="space-y-3 mb-8">
                {overviewHighlights.map(h => (
                  <div key={h} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${COLOR}15` }}>
                      <CheckCircle2 size={12} style={{ color: COLOR }} />
                    </div>
                    <span className="text-[17px] font-medium" style={{ color: '#1a1a1a' }}>{h}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: GRADIENT, boxShadow: `0 8px 24px ${COLOR}35` }}>
                  Get a Demo <ArrowRight size={16} />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50"
                  style={{ border: `1.5px solid ${COLOR}90`, color: COLOR }}>
                  Start Free Trial
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="rounded-3xl overflow-hidden text-white relative"
                style={{ background: GRADIENT, boxShadow: `0 28px 70px ${COLOR}35` }}>
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.20) 0%, transparent 65%)' }} />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 65%)' }} />
                <div className="relative px-7 pt-7 pb-5">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-white"
                      style={{ background: 'rgba(255,255,255,0.22)' }}>
                      <Rocket size={28} className="text-white" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-[22px] font-extrabold">AI-ATS / HRMS</h3>
                      <p className="text-white text-[13px] font-semibold mt-0.5">AI-Powered Recruitment Platform</p>
                    </div>
                  </div>
                  <div className="h-px" style={{ background: 'rgba(255,255,255,0.25)' }} />
                </div>
                <div className="relative px-5 pb-7">
                  <p className="text-[13px] font-black uppercase tracking-widest mb-3 pl-1" style={{ color: 'rgba(255,255,255,0.95)' }}>AI Features</p>
                  <div className="space-y-2.5">
                  {overviewFeaturePills.map(f => (
                    <div key={f.title} className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{ background: 'rgba(255,255,255,0.22)' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-white/15">
                        <f.Icon size={16} className="text-white" strokeWidth={2} />
                      </div>
                      <span className="text-[14.5px] text-white font-extrabold">{f.title}</span>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Candidate Management */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
              style={{ color: COLOR, background: '#FFFFFF', borderColor: COLOR, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR }} />
              Candidate Management
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Build and manage your talent pool with confidence</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {candidateFeatures.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 80} className="h-full">
                <div className="p-7 group hover:-translate-y-1 transition-all duration-300 h-full"
                  style={{
                    background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, ${COLOR} 0%, ${COLOR} 20%, ${COLOR}CC 45%, ${COLOR}55 70%, transparent 90%) border-box`,
                    borderStyle: 'solid', borderColor: 'transparent', borderTopWidth: '4px',
                    borderLeftWidth: '0', borderRightWidth: '0', borderBottomWidth: '0', borderRadius: '16px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)',
                  }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${COLOR}10`, border: `1.5px solid ${COLOR}20` }}>
                    <f.Icon size={22} style={{ color: COLOR }} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-bold text-[19px] mb-2" style={{ color: '#1a1a1a' }}>{f.title}</h3>
                  <p className="text-[16.5px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline & Shortlisting */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at bottom left, ${COLOR}04 0%, transparent 70%)` }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
              style={{ color: COLOR, background: '#FFFFFF', borderColor: COLOR, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR }} />
              Pipeline & Shortlisting
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Track every candidate from screening to placement</h2>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {pipelineFeatures.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 70}>
                <div className="flex gap-5 p-6 rounded-2xl group hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden h-full"
                  style={{ 
                    background: '#FFFFFF', 
                    border: '1px solid rgba(190,18,60,0.25)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)',
                  }}
                >
                  <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full transition-all duration-300 group-hover:top-2 group-hover:bottom-2 group-hover:w-1.5"
                    style={{ background: GRADIENT, opacity: 0.8 }} />
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                    style={{ 
                      background: `${COLOR}08`, 
                      border: `1.5px solid ${COLOR}18`,
                      boxShadow: `0 4px 12px rgba(190,18,60,0.05)`,
                    }}>
                    <f.Icon size={22} style={{ color: COLOR }} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[19px] mb-1.5 transition-colors duration-200 group-hover:text-[#BE123C]" style={{ color: '#1a1a1a' }}>
                      {f.title}
                    </h3>
                    <p className="text-[16.5px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Pipeline Stages */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
              style={{ color: COLOR, background: '#FFFFFF', borderColor: COLOR, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR }} />
              Hiring Pipeline Stages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Structured Candidate Journey</h2>
            <p className="text-[16px] font-medium max-w-3xl mx-auto mb-8" style={{ color: '#1a1a1a' }}>
              Candidates progress through a structured pipeline from application to placement. Rejected and On Hold stages are available at any point.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 relative">
            {pipelineStages.map((stage, i) => {
              const s = stageColors[stage.type];
              const nextS = i < pipelineStages.length - 1 ? stageColors[pipelineStages[i + 1].type] : null;
              const desktopDir = getDesktopDirection(i);
              const tabletDir = getTabletDirection(i);
              const desktopOrder = DESKTOP_ORDERS[i] || '';
              const tabletOrder = TABLET_ORDERS[i] || '';

              return (
                <AnimatedSection 
                  key={stage.label} 
                  delay={i * 50} 
                  className={`relative h-full ${tabletOrder} ${desktopOrder}`}
                >
                  <div className="p-5 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-md h-full flex flex-col justify-between relative z-10"
                    style={{ background: '#FFFFFF', borderColor: 'rgba(0,0,0,0.15)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md"
                        style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}30` }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: s.text }}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${stage.type === 'active' ? 'animate-pulse animate-duration-1000' : ''}`}
                          style={{ background: s.text }} />
                        {stage.type === 'won' ? 'Success' : 'In Progress'}
                      </div>
                    </div>
                    <h3 className="font-bold text-[17px] text-gray-800 leading-snug group-hover:text-[#BE123C] transition-colors duration-200">
                      {stage.label}
                    </h3>
                  </div>
                  
                  {/* Dynamic Connector lines between steps */}
                  {i < pipelineStages.length - 1 && nextS && (
                    <>
                      {/* Desktop connector (lg) */}
                      {desktopDir === 'Right' && (
                        <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-full w-6 items-center justify-center z-20" style={{ width: '24px' }}>
                          <div className="h-[2px] w-full" style={{ background: COLOR }} />
                          <ChevronRight size={14} className="absolute -right-1 shrink-0 animate-flow-right" style={{ color: COLOR }} />
                        </div>
                      )}
                      {desktopDir === 'Left' && (
                        <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-full w-6 items-center justify-center z-20" style={{ width: '24px' }}>
                          <div className="h-[2px] w-full" style={{ background: COLOR }} />
                          <ChevronLeft size={14} className="absolute -left-1 shrink-0 animate-flow-left" style={{ color: COLOR }} />
                        </div>
                      )}
                      {desktopDir === 'Down' && (
                        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-full h-8 flex-col items-center justify-center z-20" style={{ height: '32px' }}>
                          <div className="w-[2px] h-full" style={{ background: COLOR }} />
                          <ChevronDown size={14} className="absolute -bottom-1 shrink-0 animate-flow-down" style={{ color: COLOR }} />
                        </div>
                      )}

                      {/* Tablet connector (sm:flex lg:hidden) */}
                      {tabletDir === 'Right' && (
                        <div className="hidden sm:flex lg:hidden absolute top-1/2 -translate-y-1/2 left-full w-6 items-center justify-center z-20" style={{ width: '24px' }}>
                          <div className="h-[2px] w-full" style={{ background: COLOR }} />
                          <ChevronRight size={14} className="absolute -right-1 shrink-0 animate-flow-right" style={{ color: COLOR }} />
                        </div>
                      )}
                      {tabletDir === 'Left' && (
                        <div className="hidden sm:flex lg:hidden absolute top-1/2 -translate-y-1/2 right-full w-6 items-center justify-center z-20" style={{ width: '24px' }}>
                          <div className="h-[2px] w-full" style={{ background: COLOR }} />
                          <ChevronLeft size={14} className="absolute -left-1 shrink-0 animate-flow-left" style={{ color: COLOR }} />
                        </div>
                      )}
                      {tabletDir === 'Down' && (
                        <div className="hidden sm:flex lg:hidden absolute left-1/2 -translate-x-1/2 top-full h-8 flex-col items-center justify-center z-20" style={{ height: '32px' }}>
                          <div className="w-[2px] h-full" style={{ background: COLOR }} />
                          <ChevronDown size={14} className="absolute -bottom-1 shrink-0 animate-flow-down" style={{ color: COLOR }} />
                        </div>
                      )}

                      {/* Mobile connector (flex sm:hidden) - always Down */}
                      <div className="flex sm:hidden absolute left-1/2 -translate-x-1/2 top-full h-8 flex-col items-center justify-center z-20" style={{ height: '32px' }}>
                        <div className="w-[2px] h-full" style={{ background: COLOR }} />
                        <ChevronDown size={14} className="absolute -bottom-1 shrink-0 animate-flow-down" style={{ color: COLOR }} />
                      </div>
                    </>
                  )}
                </AnimatedSection>
              );
            })}
          </div>

          {/* SVG Connector Lines for Outcomes (Desktop lg only) */}
          <div className="hidden lg:block w-full my-4" style={{ height: '48px' }}>
            <svg width="100%" height="48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              {/* Horizontal line at y=24 from 10% to 90% */}
              <line x1="10%" y1="24" x2="90%" y2="24" stroke="#7c8fa6" strokeWidth="1.5" strokeDasharray="6 4" />
              {/* Vertical drops from each column center (10%, 30%, 50%, 70%, 90%) */}
              <line x1="10%" y1="0" x2="10%" y2="24" stroke="#7c8fa6" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="30%" y1="0" x2="30%" y2="24" stroke="#7c8fa6" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="50%" y1="0" x2="50%" y2="48" stroke="#7c8fa6" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="70%" y1="0" x2="70%" y2="24" stroke="#7c8fa6" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="90%" y1="0" x2="90%" y2="24" stroke="#7c8fa6" strokeWidth="1.5" strokeDasharray="6 4" />
            </svg>
          </div>

          {/* Connector for Outcomes (Tablet/Mobile only) */}
          <div className="lg:hidden flex flex-col items-center my-6">
            <svg width="2" height="48" xmlns="http://www.w3.org/2000/svg">
              <line x1="1" y1="0" x2="1" y2="48" stroke="#7c8fa6" strokeWidth="1.5" strokeDasharray="6 4" />
            </svg>
          </div>

          {/* Terminal outcomes centered side-by-side */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-4 w-full max-w-2xl mx-auto">
            {terminalStages.map((stage) => {
              const s = stageColors[stage.type];
              return (
                <div key={stage.label} className="flex-1 max-w-xs">
                  <div className="p-5 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-md h-full flex flex-col justify-between relative z-10"
                    style={{ background: '#FFFFFF', borderColor: 'rgba(0,0,0,0.15)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md"
                          style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}30` }}>
                          OUTCOME
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: s.text }}>
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.text }} />
                          {stage.type === 'lost' ? 'Disqualified' : 'On Hold'}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: s.bg, border: `1.5px solid ${s.border}30` }}>
                          {stage.type === 'lost' ? (
                            <X size={20} style={{ color: s.text }} strokeWidth={2.5} />
                          ) : (
                            <Pause size={18} style={{ color: s.text }} strokeWidth={2.5} />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800 leading-snug group-hover:text-[#BE123C] transition-colors duration-200">
                            {stage.label}
                          </h3>
                          <p className="text-xs font-medium" style={{ color: '#1a1a1a' }}>
                            {stage.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* User Roles */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
              style={{ color: COLOR, background: '#FFFFFF', borderColor: COLOR, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR }} />
              User Roles
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Built for every member of your team</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((r, i) => (
              <AnimatedSection key={r.title} delay={i * 100} className="h-full">
                <div className="p-8 rounded-3xl h-full hover:-translate-y-1.5 transition-all duration-300 flex flex-col relative overflow-hidden group"
                  style={{ 
                    background: '#FFFFFF', 
                    border: '1px solid rgba(0,0,0,0.15)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)',
                  }}>
                  {/* Decorative concentric quarter-circle arcs */}
                  <svg className="absolute top-0 right-0 pointer-events-none opacity-20" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M80 0 A20 20 0 0 1 60 20" stroke={COLOR} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M80 0 A38 38 0 0 1 42 38" stroke={COLOR} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M80 0 A56 56 0 0 1 24 56" stroke={COLOR} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M80 0 A74 74 0 0 1 6 74" stroke={COLOR} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                  
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3"
                    style={{ 
                      background: `${COLOR}08`, 
                      border: `1.5px solid ${COLOR}18`,
                      boxShadow: `0 4px 12px rgba(190,18,60,0.05)`,
                    }}>
                    <r.Icon size={24} style={{ color: COLOR }} strokeWidth={1.75} />
                  </div>
                  
                  <h3 className="font-extrabold text-[21px] mb-3 text-slate-900">{r.title}</h3>
                  <p className="text-[16.5px] font-medium leading-relaxed flex-1" style={{ color: '#1a1a1a' }}>{r.desc}</p>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-[16px] font-bold text-left" style={{ color: COLOR }}>
                    Permissions Level: <span className="font-black uppercase tracking-wider">{r.title === 'Super Admin' ? 'Full Access' : r.title === 'Recruitment Manager' ? 'Managerial' : 'Standard'}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${COLOR}06 0%, transparent 70%)` }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/ImageUpdated.svg" alt="" aria-hidden="true"
          className="absolute left-0 bottom-0 h-[60%] max-h-[350px] w-auto opacity-[0.12] pointer-events-none select-none object-contain" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
              style={{ color: COLOR, background: '#FFFFFF', borderColor: COLOR, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR }} />
              Ideal For
            </span>
            <h2 className="text-3xl font-bold text-gray-900">Built for teams like yours</h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-5">
            {idealFor.map((item, i) => (
              <AnimatedSection key={item} delay={i * 80}>
                <div className="p-6 rounded-2xl flex items-start gap-4 hover:-translate-y-1 transition-all duration-300 h-full"
                  style={{ 
                    background: 'linear-gradient(145deg, #FFFFFF 0%, #FFFDFD 100%)', 
                    border: '1px solid rgba(190,18,60,0.25)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
                  }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${COLOR}12` }}>
                    <CheckCircle2 size={18} style={{ color: COLOR }} />
                  </div>
                  <span className="text-[16px] font-bold leading-relaxed pt-1" style={{ color: '#1a1a1a' }}>{item}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${COLOR}05 0%, transparent 65%)` }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${COLOR}20, transparent)` }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border"
              style={{ color: COLOR, background: '#FFFFFF', borderColor: COLOR, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              Get Started Today
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cut your time-to-shortlist —{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                without cutting corners.
              </span>
            </h2>
            <p className="font-medium mb-10 text-lg" style={{ color: '#1a1a1a' }}>
              Book a demo and see how Innovatiq AI-ATS helps your team place more candidates, faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: GRADIENT, boxShadow: `0 8px 24px ${COLOR}35` }}>
                Get a Demo <ArrowRight size={16} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50"
                style={{ border: `1px solid ${COLOR}35`, color: COLOR }}>
                Start Free Trial
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
