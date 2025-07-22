# pages-franja-destaques-custom - Show Component

Componente de renderização no Show Services.

Para mais detalhes sobre o funcionamento dos componentes e os tipos existentes, veja a [Documentação](https://developer.globoi.com/docs/default/component/backstage-docs/show/renderizacao/)

## Links úteis

## Debugging

-   [Sentry do componente **pages-franja-destaques-custom**](https://web.sentry.globoi.com/globocom/show-services-template-render/?query=is%3Aunresolved+infoglobo%2Fpages-franja-destaques-custom)

### Configurações de um componente show

-   [Atributos do config.yaml](https://developer.globoi.com/docs/default/component/backstage-docs/show/renderizacao/configuration/)
-   [Variáveis no contexto jinja](https://developer.globoi.com/docs/default/component/backstage-docs/show/renderizacao/context/)

## Rodando o Sandbox

### com Docker

1. `make setup`
2. `make run`

### local com python

1. `python-sandbox-setup`
2. `make run-python`

Para mais informações sobre o uso do Sandbox, acesse a [Documentação](http://docs.backstage.globoi.com/show/sandbox/).

## Rodando o Sandbox com múltiplos componentes locais

Cerifique-se que a pasta com os componentes está com o volume configurado no docker-compose:

```yaml
...
services:
...
  sandbox:
  ...
    volumes:
      - ".:/component" # <== Pasta com o componente principal
      - "..:/show" # <== Pasta com todos os componentes
...
```

Adicione o parâmetro `--components-dir /show` no atributo `command`:

```yaml
command: --env qa --components-dir /show
```

## Gerando uma release

Para gerar uma release para teste (release instável), utilize:

```
$ backstage release
```

Para gerar um release versionado (release estável), utilize:

```
$ backstage bump (--patch, --minor, --major)
$ backstage release
```

## Instalando um componente

### O fluxo recomendado para instalação de componentes é gerar uma release (conforme descrito na sessão acima) e fazer a instalação nos targets (env, tipo de conteúdo e tenant) via [Backstage Console](https://console.backstage.globoi.com/).

! ATENÇÃO

Caso deseje fazer o deploy automático do componente para algum target de teste (recomendamos que seja feito apenas no ambiente de QA!), é necessário configurá-lo no seu `backstage.yaml`:

```
showComponents:
  - slug: uma/slug
    path: um/path
    version: 0.0.1
    installationTargets:
      qa:
      - tenant: dev-beta
        content-type: multi-content
        env: qa
    hooks:
      predeploy:
      - cmd: make
        args:
        - -C
        - show/show luiza teste
        - build
```

Uma vez configurado o target, é possível executar o deploy diretamente para o ambiente usando

```
$ backstage deploy qa
```
