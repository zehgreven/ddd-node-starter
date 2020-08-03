## Skeleton for Node.js applications written in TypeScript

### First deploy

1. Start database container;

```bash
docker-compose up -d
```

2. Copy ormconfig.example.json to ormconfig.json with your DB connection;
3. Install dependencies;
```bash
yarn
```

4. Compile .ts to .js files to ./bin/ folder;
```bash
yarn compile
```

5. Up migrations;
```bash
yarn typeorm migrations:run
```

6. Run Application in dev mode.
```bash
yarn dev
```

### Testing

1. Execute command in cli;
```bash
yarn test:all
```