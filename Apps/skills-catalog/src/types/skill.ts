export type SkillIndexItem = {
  id: string;
  path: string;
  category: string;
  name: string;
  description: string;
  risk: string;
  source: string;
};

export type TopLevelCategory =
  | 'Frontend'
  | 'Backend'
  | 'Security'
  | 'Review'
  | 'Mobile'
  | 'Research'
  | 'DevOps'
  | 'Other';

export type InvocationPlatform =
  | 'codex'
  | 'claude'
  | 'cursor'
  | 'gemini'
  | 'antigravity'
  | 'generic';

export type InvocationScope = 'repo' | 'folder' | 'file';
