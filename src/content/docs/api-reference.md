---
title: API リファレンス
description: S-IDEのREST APIエンドポイント
order: 3
---

# API リファレンス

S-IDEはRESTful APIを提供しており、バックエンドサーバーと通信します。

## ベースURL

デフォルト: `http://localhost:8787`

## ワークスペース

### ワークスペース一覧取得
```http
GET /api/workspaces
```

### ワークスペース作成
```http
POST /api/workspaces
Content-Type: application/json

{
  "path": "/path/to/workspace"
}
```

### デフォルトルート設定取得
```http
GET /api/config
```

## デッキ

### デッキ一覧取得
```http
GET /api/decks
```

### デッキ作成
```http
POST /api/decks
Content-Type: application/json

{
  "name": "My Deck",
  "root": "/path/to/root"
}
```

## ファイル操作

### ディレクトリ内容取得
```http
GET /api/files?path=/path/to/dir
```

### ファイル読み取り
```http
GET /api/file?path=/path/to/file
```

### ファイル書き込み
```http
PUT /api/file?path=/path/to/file
Content-Type: text/plain

file content here
```

### ファイル作成
```http
POST /api/file?path=/path/to/file
Content-Type: text/plain

file content here
```

### ファイル削除
```http
DELETE /api/file?path=/path/to/file
```

### ディレクトリ作成
```http
POST /api/dir?path=/path/to/dir
```

## ターミナル

### ターミナル一覧取得
```http
GET /api/terminals?deckId=deck-uuid
```

### ターミナル作成
```http
POST /api/terminals
Content-Type: application/json

{
  "deckId": "deck-uuid",
  "cwd": "/working/directory"
}
```

### ターミナル削除
```http
DELETE /api/terminals/:id
```

### ターミナルWebSocket (xterm.js)
```http
WS /api/terminals/:id
```

## Git

### ステータス取得
```http
GET /api/git/status?path=/path/to/repo
```

### 全リポジトリ取得
```http
GET /api/git/repos?path=/workspace/path
```

### 複数リポジトリのステータス
```http
GET /api/git/multi-status?path=/workspace/path
```

### ファイルをステージ
```http
POST /api/git/stage
Content-Type: application/json

{
  "path": "/repo/path",
  "files": ["file1.ts", "file2.ts"]
}
```

### アンステージ
```http
POST /api/git/unstage
Content-Type: application/json

{
  "path": "/repo/path",
  "files": ["file1.ts"]
}
```

### コミット
```http
POST /api/git/commit
Content-Type: application/json

{
  "path": "/repo/path",
  "message": "Commit message"
}
```

### プッシュ
```http
POST /api/git/push
Content-Type: application/json

{
  "path": "/repo/path"
}
```

### プル
```http
POST /api/git/pull
Content-Type: application/json

{
  "path": "/repo/path"
}
```

### ブランチ一覧
```http
GET /api/git/branches?path=/repo/path
```

### ブランチ切り替え
```http
POST /api/git/checkout
Content-Type: application/json

{
  "path": "/repo/path",
  "branch": "feature-branch"
}
```

### ブランチ作成
```http
POST /api/git/create-branch
Content-Type: application/json

{
  "path": "/repo/path",
  "branch": "new-branch"
}
```

## Context Manager

### ヘルスステータス取得
```http
GET /api/context-manager/status
```

### セッション作成
```http
POST /api/context-manager/session
```

### 現在のセッション取得
```http
GET /api/context-manager/session
```

### セッション終了
```http
DELETE /api/context-manager/session
```

### コンテキスト圧縮
```http
POST /api/context-manager/compact
Content-Type: application/json

{
  "keepLast": 50
}
```

### スナップショット作成
```http
POST /api/context-manager/snapshot
```

### スナップショット一覧
```http
GET /api/context-manager/snapshots
```

### 最新スナップショット取得
```http
GET /api/context-manager/snapshots/latest
```

### 最も健康なスナップショット取得
```http
GET /api/context-manager/snapshots/healthiest
```

### スナップショット復元
```http
POST /api/context-manager/snapshots/:commitHash/restore
```

## 環境変数

| 変数 | 説明 | デフォルト | 必須 |
|------|------|-----------|------|
| `DEFAULT_ROOT` | デフォルトワークスペースパス | `os.homedir()` | いいえ |
| `PORT` | サーバーポート | `8787` | いいえ |
| `HOST` | サーバーホスト | `0.0.0.0` | いいえ |
| `BASIC_AUTH_USER` | Basic認証ユーザー名 | - | 本番 |
| `BASIC_AUTH_PASSWORD` | Basic認証パスワード | - | 本番 |
| `CORS_ORIGIN` | CORSオリジン | - | 本番 |
