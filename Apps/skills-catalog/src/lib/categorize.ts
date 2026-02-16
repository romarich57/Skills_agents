import type { SkillIndexItem, TopLevelCategory } from '../types/skill';

const CATEGORY_KEYWORDS: Record<TopLevelCategory, string[]> = {
  Frontend: ['web', 'frontend', 'ui', 'ux', 'tailwind', 'css', 'design'],
  Backend: ['backend', 'api', 'server', 'db', 'database', 'sql', 'postgres', 'auth'],
  Security: ['security', 'secure', 'oauth', 'jwt', 'xss', 'csrf', 'pentest', 'threat'],
  Review: ['review', 'lint', 'validate', 'refactor', 'quality', 'cleanup', 'code-smell'],
  Mobile: ['mobile', 'ios', 'android', 'react-native', 'swiftui', 'kotlin'],
  Research: ['research', 'search', 'crawl', 'docs', 'context', 'exa', 'firecrawl'],
  DevOps: ['devops', 'docker', 'kubernetes', 'k8s', 'ci', 'cd', 'deployment', 'nginx'],
  Other: []
};

export function extractPathGroup(path: string): string | null {
  const segments = path.split('/').filter(Boolean);
  if (segments.length >= 3 && segments[0] === 'skills') {
    return segments[1];
  }
  return null;
}

export function inferTopLevelCategory(skill: SkillIndexItem): TopLevelCategory {
  const haystack = [skill.id, skill.name, skill.description, skill.path, skill.category]
    .join(' ')
    .toLowerCase();

  const orderedCategories: TopLevelCategory[] = [
    'Frontend',
    'Backend',
    'Security',
    'Review',
    'Mobile',
    'Research',
    'DevOps'
  ];

  for (const category of orderedCategories) {
    if (CATEGORY_KEYWORDS[category].some((keyword) => haystack.includes(keyword))) {
      return category;
    }
  }

  return 'Other';
}
