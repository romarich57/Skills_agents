import type { InvocationPlatform, InvocationScope } from '../types/skill';

function buildScopePrompt(scope: InvocationScope, skillId: string, lang: 'en' | 'fr'): string {
  if (lang === 'fr') {
    if (scope === 'repo') {
      return `Utilise ${skillId}. Applique cette compétence à ce repository. Fournis un résultat structuré.`;
    }
    if (scope === 'folder') {
      return `Utilise ${skillId} sur src/. Conserve le comportement existant. Fournis les modifications fichier par fichier.`;
    }
    return `Utilise ${skillId} sur src/app.ts. Fournis le fichier final patché.`;
  }

  if (scope === 'repo') {
    return `Use ${skillId}. Apply it to this repository. Output a structured result.`;
  }
  if (scope === 'folder') {
    return `Use ${skillId} on src/. Keep behavior unchanged. Provide file-by-file diffs.`;
  }
  return `Use ${skillId} on src/app.ts. Provide the final patched file.`;
}

export function buildInvocation(
  platform: InvocationPlatform,
  scope: InvocationScope,
  skillId: string,
  lang: 'en' | 'fr' = 'en'
): string {
  const prompt = buildScopePrompt(scope, skillId, lang);

  switch (platform) {
    case 'codex':
      return `codex "${prompt}"`;
    case 'claude':
      return `>> /${skillId}\n${prompt}`;
    case 'cursor':
      return `@${skillId} ${prompt}`;
    case 'gemini':
    case 'antigravity':
    case 'generic':
      return prompt;
    default:
      return prompt;
  }
}
