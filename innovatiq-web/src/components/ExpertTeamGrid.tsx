'use client';
import { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import TeamMemberCard from './TeamMemberCard';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  photo: string;
  accent: string;
  photoPosition?: string;
}

export default function ExpertTeamGrid({ members }: { members: TeamMember[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start justify-items-center sm:justify-items-stretch max-w-4xl mx-auto w-full">
      {members.map((m, i) => (
        <AnimatedSection
          key={m.name}
          delay={i * 80}
          className="w-full max-w-xs sm:max-w-none"
        >
          <TeamMemberCard
            m={m}
            expanded={expandedIndex === i}
            onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
          />
        </AnimatedSection>
      ))}
    </div>
  );
}
