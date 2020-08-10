# PoaBus

Sistema integrado ao [DataPoa](http://datapoa.com.br/group/about/mobilidade) para consulta de linhas de ônibus e linhas de lotação.

[Live Preview](http://poa-bus.surge.sh)

## Scripts

Rodar o projeto localhost.

```console
npm install
npm start
```

### Build

Gerar um build

```console
npm run build
```

Gerar um build para produção

```console
npm run build:prod
```
## Testes

O projeto utiliza [jest](https://jestjs.io/) para rodar os testes unitários, para rodar todos os testes, utilize:

```console
npm test
```

Para rodar os testes e limpar os snapshots, utilize:

```console
npm run test:snapshot
```

Para rodar os testes e gerar o relatório de code-coverage, utilize:

```console
npm run test:coverage
```

Abre relatório de cobertura de código.

```console
npm run open-coverage
```

### Dependências

Instala dependências do projeto.

```console
npm install
```

Limpa dependências do projeto.

```console
npm run clean
```

Limpa dependências (npm run clean) e instalar tudo novamente (npm install).

```console
npm run reinstall
```

### CI/CD

Valida o código (ng lint) e roda os testes com relatório de coverage (npm run test:snapshot).

```console
npm run review
```

Este projeto utiliza o [surge.sh](https://surge.sh/) para deploy.

```console
npm run deploy
```
