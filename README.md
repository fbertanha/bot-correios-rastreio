# Script para automatizar a geração de boletos


### Instalação

Para utilizar esse script é necessário ter [Node.js](https://nodejs.org/) previamente instalado.

Após fazer um clone do projeto ou download do zip, acessar o diretório do mesmo e instalar suas as dependências, seguindo os comandos abaixo

```sh
$ cd bot-boleto
$ npm install
```

### Utilização
Para utiliza basta rodar o comando abaixo

```sh
$ node bot_cednet_boleto
```

Ou, caso deseje tudo em um único comando...

```sh
$ node bot_cednet_boleto seu_cpf data_vencimento
```

### Adicionar ao terminal/cmd
Para utilizar o comando em qualquer local pelo terminal/cmd, utilizar o comando abaixo

```sh
$ npm link
```

### Remover do terminal/cmd
Caso não deseje mais utilizar os comandos por terminal, basta remover utilizando o comando

```sh
$ npm unlink
```
