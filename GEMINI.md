# Honox Blog リポジトリ構成説明書 (GEMINI.md)

本リポジトリは、**HonoX**（Hono + Vite）と **Cloudflare Pages / Wrangler** を用いて構築された、静的サイト生成（SSG）ベースのブログプロジェクトです。

---

## 🚀 プロジェクト概要
- **ブログ名**: 群青日和
- **URL**: [https://gunjobiyori.com](https://gunjobiyori.com)
- **特徴**: MDXを使用したブログ記事管理、自動OGP画像生成、静的サイト生成 (SSG)、Tailwind CSS + DaisyUI によるスタイリング。

---

## 🛠️ 技術スタック

### コアフレームワーク & ランタイム
- **Hono & HonoX**: 軽量かつ高速なWebフレームワーク。HonoXによるファイルベースルーティングを採用。
- **React 19**: UIコンポーネントライブラリ。
- **Vite & @hono/vite-ssg**: ビルドツールおよびSSG（静的サイト生成）プラグイン。

### マークダウン (MDX) 関連
- **@mdx-js/rollup**: MDXファイルのRollupビルド。
- **remark-frontmatter / remark-gfm / remark-mdx-frontmatter**: MDXのメタデータ（Frontmatter）や拡張Markdown記法のサポート。

### デザイン & スタイリング
- **Tailwind CSS (v3)** / **daisyUI (v4)**: ユーティリティファーストCSSとコンポーネントライブラリ。
- **Radix UI**: アクセシブルなコンポーネント（Navigation Menu等）の採用。
- **Lucide React**: アイコンフォントライブラリ。

### OGP画像生成
- **satori & @resvg/resvg-js**: JSX / HTMLからSVGを経由してPNG形式のOGP画像を動的に生成。

### ホスティング & デプロイ
- **Cloudflare Wrangler**: Cloudflare Pagesへのプレビューとデプロイ用。

---

## 📂 ディレクトリ構成

```text
honox-blog/
├── .vscode/               # VS Code設定ファイル
├── .wrangler/             # Wranglerのキャッシュ・一時ファイル
├── app/                   # アプリケーションのメインソースコード
│   ├── client.ts          # クライアントサイドのエントリポイント
│   ├── server.ts          # サーバーサイド（ビルド時等）のエントリポイント
│   ├── global.css         # グローバルCSSスタイル（Tailwind/DaisyUIのインポート）
│   ├── global.d.ts        # グローバル型定義（Frontmatter等）
│   ├── components/        # 共通Reactコンポーネント
│   │   ├── category.tsx   # カテゴリ表示用タグ
│   │   ├── footer.tsx     # フッター
│   │   ├── gravatar.tsx   # アバター画像表示用
│   │   ├── header.tsx     # ヘッダー
│   │   ├── hero.tsx       # ヒーローエリア
│   │   ├── pagination.tsx # ページネーションコントロール
│   │   ├── post-card-list.tsx # 記事カードリスト
│   │   └── post-card.tsx  # 個別の記事カード
│   ├── constants/         # 定数定義
│   │   └── config.ts      # サイト設定（タイトル、説明、ページネーション数など）
│   ├── islands/           # ハイドレーションが必要なインタラクティブコンポーネント
│   │   └── menu.tsx       # ナビゲーションメニュー
│   ├── lib/               # ヘルパーライブラリ
│   │   └── posts.ts       # MDX記事一覧の読み込み、ソート、フィルタリング、ページネーションロジック
│   ├── routes/            # ファイルベースのルーティング設計
│   │   ├── _404.tsx       # 404 エラーハンドラ
│   │   ├── _error.tsx     # エラーハンドラ
│   │   ├── _middleware.ts # ミドルウェア
│   │   ├── _renderer.tsx  # メインレイアウトテンプレート（メタタグ、OGP、GAスクリプト）
│   │   ├── index.tsx      # トップページ（ブログ記事一覧とページネーション）
│   │   ├── rss.xml.ts     # RSSフィード生成
│   │   ├── categories/    # カテゴリごとの記事一覧ルーティング
│   │   │   ├── index.tsx  # カテゴリ一覧
│   │   │   └── [category].tsx # 特定カテゴリの記事一覧
│   │   ├── fixed/         # 固定ページ用（aboutなど）
│   │   │   ├── _renderer.tsx
│   │   │   ├── about.mdx
│   │   │   └── werewolf-archives.mdx
│   │   ├── og/            # 動的OGP画像生成ルーティング
│   │   │   └── [slug].tsx  # 各記事に対応するOGP画像の動的生成・出力
│   │   ├── page/          # ページネーション用ルーティング
│   │   │   └── [page].tsx
│   │   └── posts/         # 個別のブログ記事（MDX）ディレクトリ
│   │       ├── _renderer.tsx # 記事ページ専用レイアウト
│   │       └── *.mdx      # 記事データ本体 (日付-タイトル.mdx形式)
│   └── types/             # 共通型定義
│       └── post.ts        # 記事データやメタデータの型定義
├── public/                # 静的アセット（画像、フォント、Favicon等）
├── dist/                  # ビルド成果物の出力先
├── package.json           # プロジェクト依存関係とスクリプト
├── wrangler.toml          # Cloudflare Pages設定ファイル
└── vite.config.ts         # Viteの設定ファイル（HonoX、SSG、MDXプラグイン設定）
```

---

## 💻 動作コマンド

パッケージ管理とランタイムツールの実行には、[mise](https://mise.jdx.dev/) と `pnpm` を使用します。

### ツールのセットアップ
リポジトリで定義されたツール（pnpm等）をインストールします。
```bash
mise install
```

### パッケージのインストール
```bash
mise exec -- pnpm i --frozen-lockfile
```
または、`mise` が有効なシェル環境であれば `pnpm i --frozen-lockfile` でも実行可能です。

### ローカル開発サーバーの起動
Vite 開発サーバーを起動し、ホットリロード有効で動作します。
```bash
mise exec -- pnpm run dev
```

### 静的サイト生成 (SSG) ビルド
クライアントアセットとサーバーサイド（SSG）のビルドを実行します。
```bash
mise exec -- pnpm run build
```

### ローカルプレビュー
Wrangler Pages を使用して、本番ビルドに近い環境でプレビューを実行します。
```bash
mise exec -- pnpm run preview
```

### デプロイ
ビルドを走らせた後、Wrangler を使用して Cloudflare Pages にデプロイします。
```bash
mise exec -- pnpm run deploy
```

---

## 🛠️ 移行・画像処理用スクリプト

プロジェクトのルートディレクトリには、WordPress等からの移行や、画像の最適化を補助するシェルスクリプトおよびRubyスクリプトが用意されています。

1. **`md_convert.sh`** (シェルスクリプト)
   - `app/routes/posts/` 内の `.md` ファイルを検出し、ファイル名を `YYYY-MM-DD-filename.md` から `YYYYMMDD-filename.mdx` にリネームして拡張子を `.mdx` に変換します。

2. **`image_replace.rb`** (Rubyスクリプト)
   - MDXファイル内のMarkdown画像記法（例: `![alt](images/filename-widthxheight.ext)`）を正規表現で走査し、WebPへの画像パス（`/static/images/`）と、適切なHTML `<img>` タグ（`width`/`height` 属性付き）に一括置換します。

3. **`optimize_images.sh`** (シェルスクリプト)
   - `public/static/images` 配下の JPG/JPEG/PNG 画像を `optimizt` ツールを用いて WebP 形式に一括変換し、元のファイルを削除します。

4. **`convert-img-to-markdown.sh`** (シェルスクリプト)
   - MDXファイル内の `<img>` タグを、Markdown形式の画像リンクを `<a>` タグでラップした構造（`<a href="src">![alt](src)</a>`）に変換します。
