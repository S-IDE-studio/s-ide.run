export const translations = {
  ja: {
    nav: {
      home: 'ホーム',
      features: '機能',
      docs: 'ドキュメント',
      download: 'ダウンロード',
    },
    hero: {
      title: 'AIエージェントのための',
      gradient: '次世代IDE',
      subtitle: 'S-IDEはAIワークフローに最適化されたインテリジェントな開発環境です',
      cta: '今すぐダウンロード',
    },
    features: {
      title: '主要機能',
      subtitle: 'AI開発を加速するパワフルな機能',
    },
    cta: {
      title: '今すぐ始めましょう',
      description: 'S-IDEでAI開発の新しい体験を',
      button: '無料でダウンロード',
    },
    download: {
      title: 'ダウンロード',
      subtitle: 'お使いのOSを選択してください',
      latest: '最新版',
      windows: 'Windows',
      macos: 'macOS',
      linux: 'Linux',
      size: 'サイズ',
    },
  },
  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      docs: 'Docs',
      download: 'Download',
    },
    hero: {
      title: 'Next-Gen IDE for',
      gradient: 'AI Agents',
      subtitle: 'S-IDE is an intelligent dev environment optimized for AI workflows',
      cta: 'Download Now',
    },
    features: {
      title: 'Features',
      subtitle: 'Powerful features to accelerate AI development',
    },
    cta: {
      title: 'Get Started Today',
      description: 'Experience a new way of AI development',
      button: 'Download Free',
    },
    download: {
      title: 'Download',
      subtitle: 'Select your operating system',
      latest: 'Latest Release',
      windows: 'Windows',
      macos: 'macOS',
      linux: 'Linux',
      size: 'Size',
    },
  },
};

export type TranslationKey = keyof typeof translations.ja;
export type Locale = keyof typeof translations;
