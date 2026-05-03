// projects.js — Registro de proyectos para soporte multi-proyecto

const PROJECT_COLORS = [
  '#6366f1', '#10b981', '#f59e0b', '#ef4444',
  '#06b6d4', '#8b5cf6', '#ec4899', '#84cc16'
];

const PROJECT_EMOJIS = ['⏱','🚀','🛠','📱','🌐','🤖','🎯','💡'];

const DEFAULT_PROJECTS = [
  {
    id: 'smarttimemanager',
    name: 'SmartTimeManager',
    description: 'Sistema Adaptativo de Organización Personal',
    stack: 'React Native · Firebase · Node.js · IA Ligera',
    color: '#6366f1',
    emoji: '⏱',
    isDefault: true,
    blocks: [
      { id: 1, name: 'Fundamentos & CRUD' },
      { id: 2, name: 'IA, Notificaciones & Lanzamiento' }
    ]
  }
];

function generateProjectId(name) {
  const slug = name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  return `${slug}-${Date.now()}`;
}

if (typeof window !== 'undefined') {
  window.DEFAULT_PROJECTS = DEFAULT_PROJECTS;
  window.PROJECT_COLORS = PROJECT_COLORS;
  window.PROJECT_EMOJIS = PROJECT_EMOJIS;
  window.generateProjectId = generateProjectId;
}
