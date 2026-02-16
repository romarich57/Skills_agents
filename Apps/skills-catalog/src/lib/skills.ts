import type { SkillIndexItem, TopLevelCategory } from '../types/skill';
import { inferTopLevelCategory } from './categorize';
import { getLocalizedDescription } from './skillLocalization';

const SKILLS_DATA_URL = '/data/skills_index.json';

export async function loadSkills(): Promise<SkillIndexItem[]> {
  const response = await fetch(SKILLS_DATA_URL, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to load skills data (${response.status})`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid skills data format');
  }

  return data as SkillIndexItem[];
}

export function getRiskValues(skills: SkillIndexItem[]): string[] {
  return Array.from(new Set(skills.map((skill) => skill.risk).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getFilteredSkills(params: {
  skills: SkillIndexItem[];
  query: string;
  category: TopLevelCategory | 'All';
  risk: string | 'All';
  lang: 'en' | 'fr';
}): SkillIndexItem[] {
  const { skills, query, category, risk, lang } = params;
  const loweredQuery = query.trim().toLowerCase();

  return skills
    .filter((skill) => {
      if (!loweredQuery) {
        return true;
      }

      const localizedDescription = getLocalizedDescription(skill.description, lang);
      return [skill.id, skill.name, localizedDescription, skill.path]
        .join(' ')
        .toLowerCase()
        .includes(loweredQuery);
    })
    .filter((skill) => (category === 'All' ? true : inferTopLevelCategory(skill) === category))
    .filter((skill) => (risk === 'All' ? true : skill.risk === risk))
    .sort((a, b) => a.id.localeCompare(b.id));
}
