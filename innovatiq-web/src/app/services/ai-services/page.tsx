'use client';

import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import CtaSection from '@/components/home/CtaSection';
import { 
  CheckCircle2, 
  ArrowRight, 
  Map, 
  Cpu, 
  Bot, 
  Lock, 
  Search, 
  Compass, 
  Shield, 
  Lightbulb, 
  Zap, 
  FileText, 
  MessageSquare, 
  BarChart2, 
  Users, 
  RefreshCw, 
  Database, 
  Sliders, 
  ShieldCheck, 
  Link2, 
  Wrench, 
  MessageCircle, 
  Target, 
  Sparkles, 
  Globe, 
  Network, 
  Landmark, 
  Building, 
  GraduationCap, 
  ShoppingBag, 
  Factory, 
  Activity 
} from 'lucide-react';
import Link from 'next/link';

const COLOR = '#BE123C';
const GRADIENT = 'linear-gradient(135deg, #9F1239 0%, #BE123C 50%, #E11D48 100%)';

const overviewPoints = [
  'AI Readiness Assessment to understand where you stand today',
  'A phased Transformation Roadmap built around your business goals',
  'Production AI development — automation, document processing, knowledge assistants',
  'Data preparation and secure model deployment in your environment',
  'Intelligent AI agents and copilots embedded in existing workflows',
  'Ongoing monitoring, retraining, and performance management',
];

const overviewPills = [
  { Icon: Map, title: 'AI Transformation Roadmap', desc: 'Phased AI adoption plan built around your business goals and priorities.' },
  { Icon: Cpu, title: 'Intelligent Automation', desc: 'Embed AI into workflows to eliminate repetitive tasks and boost efficiency.' },
  { Icon: Bot, title: 'AI Agents & Copilots', desc: 'Intelligent agents that act and automate across your existing tools.' },
  { Icon: Lock, title: 'Secure AI Deployment', desc: 'Enterprise-grade security and compliance built in from day one.' },
];

const strategyItems = [
  { Icon: Search, title: 'AI Readiness Assessment', desc: 'Understand where your organisation stands today — what data you have, what processes are automatable, and what needs to be in place before AI delivers value.' },
  { Icon: Map, title: 'AI Transformation Roadmap', desc: 'A phased, prioritised adoption plan built around your business goals — with quick wins in the near term and a scalable foundation for the long term.' },
  { Icon: Compass, title: 'AI Technology Advisory', desc: 'Vendor-independent guidance on which platforms, models, and architectures fit your use case — so you invest in the right tools, not the loudest ones.' },
  { Icon: Shield, title: 'AI Governance & Security', desc: 'Policies, controls, and compliance frameworks so AI is adopted responsibly — and stays compliant as regulation evolves.' },
  { Icon: Lightbulb, title: 'AI Cost Optimisation', desc: 'Find the highest-value AI opportunities relative to investment — avoid over-engineering and focus effort where ROI is clearest.' },
];

const solutionsItems = [
  { Icon: Zap, title: 'Intelligent Automation', desc: 'Eliminate repetitive manual work by embedding AI into operational workflows — reducing errors, accelerating throughput, and freeing your teams for higher-value tasks.' },
  { Icon: FileText, title: 'AI-Powered Document Processing', desc: 'Extract, validate, and route data from any document type automatically — invoices, applications, contracts, correspondence — without manual data entry.' },
  { Icon: MessageSquare, title: 'Knowledge Assistants', desc: 'Give employees instant access to the information locked in your internal systems, documents, and knowledge bases — searchable and context-aware.' },
  { Icon: BarChart2, title: 'AI Insight Engine', desc: 'Surface actionable intelligence from operational data — so decision-makers have the right information at the right moment, not a week later in a report.' },
  { Icon: Users, title: 'AI for Teams', desc: 'Productivity tools embedded into the daily workflows your people already use — drafting, summarising, decision support, and task automation.' },
  { Icon: RefreshCw, title: 'Enterprise Process Transformation', desc: 'Redesign core business processes with AI embedded at each step — not bolted on afterwards.' },
];

const dataItems = [
  { Icon: Database, title: 'Data Preparation', desc: 'Structure, clean, and enrich your business data so it can power AI applications reliably — not just in demos, but at scale.' },
  { Icon: Sliders, title: 'Model Selection & Tuning', desc: 'Choose the right foundation model for each use case and customise it to your domain — avoiding costly over-engineering and under-performance.' },
  { Icon: ShieldCheck, title: 'Secure AI Deployment', desc: 'Deploy AI into your environment — cloud, on-premise, or hybrid — with security, access controls, and auditability built in from the start.' },
  { Icon: Link2, title: 'AI Integration', desc: 'Connect AI capabilities to the systems your business already runs — ERP, CRM, HRMS, custom applications — without disrupting what works.' },
  { Icon: Wrench, title: 'AI Support & Maintenance', desc: 'Ongoing monitoring, retraining, and performance management to ensure your AI continues to deliver value as your data and business evolve.' },
];

const agentItems = [
  { Icon: MessageCircle, title: 'Conversational AI Assistants', desc: 'Deploy AI that handles queries, supports employees, and manages interactions across web, mobile, and internal channels — around the clock.' },
  { Icon: Target, title: 'Task-Based AI Agents', desc: 'Automate end-to-end business tasks with goal-driven AI agents that operate within defined boundaries and hand off to humans when needed.' },
  { Icon: Sparkles, title: 'AI Copilot Enablement', desc: "Embed AI directly into your team's existing tools to assist with drafting, analysis, recommendations, and decision support in the flow of work." },
  { Icon: Zap, title: 'AI Workflow Automation Agents', desc: 'Trigger multi-step automated actions across systems — approvals, notifications, data updates — based on real-world events and conditions.' },
  { Icon: Globe, title: 'Multi-System Orchestration', desc: 'Connect AI agents across different platforms so they work together as a coordinated layer — not as isolated point solutions.' },
];

const industries = [
  { Icon: Activity, title: 'Healthcare', desc: 'Diagnostic support, clinical workflow automation, patient data management, and outpatient operations — reducing workload on clinical staff while improving patient outcomes.' },
  { Icon: Landmark, title: 'Banking & Financial Services', desc: 'Intelligent document processing, compliance automation, fraud detection support, and AI-driven customer engagement — built to meet regulatory requirements.' },
  { Icon: Factory, title: 'Manufacturing', desc: 'Predictive maintenance, asset tracking, production workflow optimisation, and quality monitoring — keeping operations running and costs down.' },
  { Icon: Building, title: 'Government & Public Sector', desc: 'Correspondence management, citizen service automation, inter-department workflow, and AI-enabled decision support — at the speed modern governance demands.' },
  { Icon: GraduationCap, title: 'Education', desc: 'Personalised learning delivery, student management automation, training operations, and administrative AI — for institutions and corporate L&D alike.' },
  { Icon: ShoppingBag, title: 'Retail', desc: 'Customer service automation, inventory intelligence, demand forecasting, and AI-driven sales operations — for retailers who need to move fast.' },
];

function featureCardStyle(color: string) {
  return {
    background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, ${color} 0%, ${color} 20%, ${color}CC 45%, ${color}55 70%, transparent 90%) border-box`,
    borderStyle: 'solid' as const,
    borderColor: 'transparent',
    borderTopWidth: '4px',
    borderLeftWidth: '0',
    borderRightWidth: '0',
    borderBottomWidth: '0',
    borderRadius: '16px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.05), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)',
  };
}

export default function AIServicesPage() {
  return (
    <>
      <PageHero 
        badge="AI Services" 
        title="Enterprise AI — From First Conversation to Full Deployment." 
        subtitle="Innovatiq helps enterprises move from AI curiosity to AI impact. Strategy, development, data, and intelligent agents — delivered as a complete practice, not a patchwork of vendors." 
      />

      {/* Overview — matches ServicePageTemplate layout */}
      <section className="relative pt-8 pb-24 overflow-hidden" style={{ background: '#FFFFFF' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
                style={{ color: COLOR, background: '#FFFFFF', borderColor: COLOR, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR }} />
                Overview
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 mb-6 leading-tight">AI Services</h2>
              <p className="leading-relaxed mb-4 text-[17px]" style={{ color: '#1a1a1a', fontWeight: 500 }}>
                Most enterprises struggle not from a lack of AI interest, but from a lack of a clear path. Pilots stall, data isn&apos;t ready, teams don&apos;t know where to start, and vendors offer tools without the context to use them well.
              </p>
              <p className="leading-relaxed mb-8 text-[17px]" style={{ color: '#1a1a1a', fontWeight: 500 }}>
                Innovatiq&apos;s AI practice covers the full journey — from assessing where you are today, to building and running production AI in your environment. One partner, end to end.
              </p>
              <div className="space-y-3 mb-8">
                {overviewPoints.map(point => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${COLOR}12` }}>
                      <CheckCircle2 size={12} style={{ color: COLOR }} />
                    </div>
                    <span className="text-[17px]" style={{ color: '#1a1a1a', fontWeight: 500 }}>{point}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: GRADIENT, boxShadow: `0 8px 24px ${COLOR}35` }}>
                  Talk to an AI Expert <ArrowRight size={16} />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50"
                  style={{ border: `1.5px solid ${COLOR}90`, color: COLOR }}>
                  View Case Studies
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="rounded-2xl p-8"
                style={{
                  background: `linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, ${COLOR} 0%, ${COLOR} 20%, ${COLOR}CC 45%, ${COLOR}55 70%, transparent 90%) border-box`,
                  borderStyle: 'solid', borderColor: 'transparent', borderTopWidth: '4px',
                  borderLeftWidth: '0', borderRightWidth: '0', borderBottomWidth: '0', borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), inset 1px 0 0 0 rgba(0,0,0,0.08), inset -1px 0 0 0 rgba(0,0,0,0.08), inset 0 -1px 0 0 rgba(0,0,0,0.08)',
                }}>
                <div className="grid grid-cols-2 gap-4">
                  {overviewPills.map(b => (
                    <div key={b.title} className="p-3 sm:p-4 rounded-xl flex flex-col gap-2 sm:gap-3"
                      style={{ background: `${COLOR}06`, border: `1px solid ${COLOR}12` }}>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${COLOR}12`, border: `1px solid ${COLOR}20` }}>
                        <b.Icon size={18} style={{ color: COLOR }} strokeWidth={1.75} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 text-[15px] sm:text-[17px] leading-snug">{b.title}</h4>
                        <p className="hidden sm:block text-[16px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* AI Strategy & Advisory */}
      <section className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #FFF8F9 0%, #FFFCFD 22%, #FFFEFE 55%, #FFFFFF 100%)' }}>
        <div className="absolute bottom-0 left-0 w-125 h-125 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at bottom left, ${COLOR}05 0%, transparent 70%)` }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/Design.svg" alt="" aria-hidden="true"
          className="absolute right-0 bottom-0 h-[70%] max-h-100 w-auto opacity-[0.12] pointer-events-none select-none object-contain" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
              style={{ color: COLOR, background: '#FFFFFF', borderColor: COLOR, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR }} />
              AI Strategy & Advisory
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight">Know where to start and how to scale.</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {strategyItems.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 80} className="h-full">
                <div className="p-7 group hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col" style={featureCardStyle(COLOR)}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${COLOR}10`, border: `1.5px solid ${COLOR}20` }}>
                    <f.Icon size={22} style={{ color: COLOR }} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 leading-snug transition-colors duration-200 group-hover:text-[#BE123C]" style={{ color: '#1a1a1a' }}>{f.title}</h3>
                  <p className="text-[16px] font-medium leading-relaxed flex-1" style={{ color: '#1a1a1a' }}>{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* AI Solutions & Development — premium split sticky layout */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <div className="absolute top-0 right-0 w-125 h-100 pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${COLOR}06 0%, transparent 60%)` }} />
        <div className="absolute bottom-0 left-0 w-125 h-100 pointer-events-none"
          style={{ background: 'radial-gradient(circle at bottom left, rgba(244,63,94,0.04) 0%, transparent 60%)' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Sticky Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <AnimatedSection direction="left">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border"
                  style={{ color: COLOR, background: '#FFFFFF', borderColor: COLOR, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR }} />
                  AI Solutions & Development
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-gray-900 leading-tight mb-6">
                  Production-ready AI built for your environment.
                </h2>
                <p className="font-medium leading-relaxed text-base mb-8" style={{ color: '#1a1a1a' }}>
                  We design, build, and deploy custom artificial intelligence solutions that integrate seamlessly with your existing infrastructure. No generic templates—just enterprise-grade AI optimized for your specific business logic, data models, and workflows.
                </p>
              </AnimatedSection>
            </div>

            {/* Right Scrolling List Column */}
            <div className="lg:col-span-7 space-y-2">
              {solutionsItems.map((f, i) => (
                <AnimatedSection key={f.title} delay={i * 50} direction="right">
                  <div className="group py-6 flex gap-6 items-start border-b last:border-b-0 transition-all duration-300"
                    style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                    
                    {/* Index / Icon column */}
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="font-mono text-sm font-extrabold transition-colors duration-300 group-hover:text-[#BE123C]"
                        style={{ color: COLOR }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-[#BE123C]/20 bg-[#BE123C]/5 text-[#BE123C] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:bg-[#BE123C] group-hover:text-white group-hover:border-transparent">
                        <f.Icon size={20} className="text-current transition-colors duration-300" strokeWidth={2} />
                      </div>
                    </div>

                    {/* Text column */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-1.5 transition-colors duration-200 group-hover:text-[#BE123C]" style={{ color: '#1a1a1a' }}>
                        {f.title}
                      </h3>
                      <p className="text-[16px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Data & Model Enablement — premium standard grid layout */}
      <section className="relative py-24 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #FFF8F9 0%, #FFFCFD 22%, #FFFEFE 55%, #FFFFFF 100%)' }}>
        <div className="absolute bottom-0 left-0 w-125 h-125 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at bottom left, ${COLOR}05 0%, transparent 70%)` }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
              style={{ color: COLOR, background: '#FFFFFF', borderColor: COLOR, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR }} />
              Data & Model Enablement
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight">Make your data AI-ready. Deploy models that perform.</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {dataItems.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 80} className="h-full">
                <div className="p-7 group hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col" style={featureCardStyle(COLOR)}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${COLOR}10`, border: `1.5px solid ${COLOR}20` }}>
                    <f.Icon size={22} style={{ color: COLOR }} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 leading-snug transition-colors duration-200 group-hover:text-[#BE123C]" style={{ color: '#1a1a1a' }}>{f.title}</h3>
                  <p className="text-[16px] font-medium leading-relaxed flex-1" style={{ color: '#1a1a1a' }}>{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents — premium white cards on radial gradient background */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF5F7 50%, #FFFFFF 100%)' }}>
        <div className="absolute bottom-0 right-0 w-125 h-125 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at bottom right, ${COLOR}05 0%, transparent 70%)` }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
              style={{ color: COLOR, background: '#FFFFFF', borderColor: COLOR, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR }} />
              AI Agents
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight">AI that acts, not just answers.</h2>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {agentItems.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 70}>
                <div className="flex gap-5 p-6 rounded-2xl group hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
                  style={{ 
                    background: '#FFFFFF', 
                    border: '1px solid rgba(190,18,60,0.06)', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px rgba(190,18,60,0.08), 0 4px 12px rgba(0,0,0,0.03)`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02)';
                  }}
                >
                  {/* Left gradient accent bar - transitions in size on hover */}
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
                    <h3 className="font-bold text-lg mb-1.5 transition-colors duration-200 group-hover:text-[#BE123C]" style={{ color: '#1a1a1a' }}>
                      {f.title}
                    </h3>
                    <p className="text-[16px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Industries — 2-col horizontal strips */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#F8FAFC' }}>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
              style={{ color: COLOR, background: '#FFFFFF', borderColor: COLOR, borderWidth: '1.5px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLOR }} />
              Industries
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 mb-3">Deployed across six sectors</h2>
            <p className="text-[16px] font-medium max-w-2xl mx-auto" style={{ color: '#1a1a1a' }}>
              Our AI solutions are deployed and producing results across six sectors.
            </p>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-4">
            {industries.map((ind, i) => (
              <AnimatedSection key={ind.title} delay={i * 60}>
                <div className="flex items-start gap-5 p-6 rounded-2xl group hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${COLOR}08`, border: `1.5px solid ${COLOR}18` }}>
                    <ind.Icon size={24} style={{ color: COLOR }} strokeWidth={1.75} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-[17px] mb-1" style={{ color: '#1a1a1a' }}>{ind.title}</h3>
                    <p className="text-[16px] font-medium leading-relaxed" style={{ color: '#1a1a1a' }}>{ind.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA — matches ServicePageTemplate */}
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
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 mb-4">
              Ready to move from AI curiosity to{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
                AI impact?
              </span>
            </h2>
            <p className="font-medium mb-10 text-lg" style={{ color: '#1a1a1a' }}>
              Talk to our AI practice team and get a clear-eyed view of where to start and what to build first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: GRADIENT, boxShadow: `0 8px 24px ${COLOR}35` }}>
                Talk to an AI Expert <ArrowRight size={16} />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50"
                style={{ border: `1.5px solid ${COLOR}35`, color: COLOR }}>
                View Case Studies
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
