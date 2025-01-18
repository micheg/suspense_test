# This is a suspense test.

## Getting Started with Node and Next 15

- First, install:

```bash
npm run install
```

- then build:

```bash
npm run build
```

- finally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Getting Started with Bun and Next 15

```bash
  bun install
  bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Getting Started with Node and Next 15

- First, change the config:

```bash
rm package.json
rm package-lock.json
rm next.config.ts
for file in *.n14.json; do mv "$file" "${file/.n14/}"; done
```

- then, install:

```bash
npm run install
```

- then build:

```bash
npm run build
```

- finally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
