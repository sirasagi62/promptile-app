# Promptile

<div align="center">
<img width="400" src="./assets/promptile-full-icon-std.svg" />
</div>

> Don't repeat yourself.

## About

Promptile(プロンプタイル)は LLM に入力するプロンプトをテンプレートとして保存し再利用できるようにする、クロスプラットフォーム GUI アプリケーションです。

- Mustache ベースのテンプレート機能
- 型の設定機能と型に基づくテンプレート適用機能
- Windows/Linux/Mac(Experimental)のクロスプラットフォーム

## Install

### Prerequirements

各プラットフォームでビルドを行います。ビルドには Golang の開発環境と`wails`コマンドの事前インストールが必要です。
[wails のインストールガイド](https://wails.io/docs/gettingstarted/installation)にしたがって`wails`の最新バージョンをインストールしてください。

### Install Promtile

プロジェクトのルートで以下のコマンドを実行してください。

```sh
wails build
```

ビルド後`./build/bin`ディレクトリにバイナリが生成されます。

クロスプラットフォームでビルドする場合はプラットフォームを設定してください。

```sh
wails build --platform windows
```

## Screenshot

<img src="./assets/promptile-demo.gif" />
