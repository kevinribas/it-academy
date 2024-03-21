# Dell IT Academy

Este repositório contém o código para um bot do Discord projetado para o processo seletivo IT Academy, o bot é utilizado para gerenciar um sistema de apostas similar à Mega-Sena.


## Utilização

A utilização dele pode ser feita de várias formas, as recomendadas são:

- Entrar no servidor criado especificamente para o bot e testá-lo, através desse link: https://discord.gg/F5YFNp84hY
- Adicionar o bot ao seu próprio servidor, através desse link: https://discord.com/oauth2/authorize?client_id=1220034691118137534&permissions=8&scope=bot



Se preferir utilizar o código desenvolvido e até implementar novas funções, você pode seguir os seguintes passos:

Requisitos: `npm v9.5.1` e `node v19.8.1`

- Clone o repositório em um diretório de sua escolha;
- Registre um bot na plataforma do Discord (https://discord.com/developers);
- Utilize o .env-exemplo e crie um arquivo .env com as variáveis de ambiente do seu bot.
- No terminal, digite `npm install`
- Após instalar, no terminal, digite `node deploy-commands.js`. Esse comando precisa ser executado apenas uma vez para o seu bot "aprender" os comandos;
- Após rodar o código anterior, no terminal novamente, digite `node index.js`. E pronto, seu bot vai estar online. Agora você só precisa convidá-lo a um servidor de sua escolha.

## Motivação

A escolha de desenvolver um bot para o Discord foi motivada pela popularidade crescente da plataforma como meio de comunicação para comunidades online, especialmente para jogos e educação. O Discord oferece uma rica API para desenvolvimento de bots, possibilitando a criação de experiências interativas e automatizadas que podem enriquecer significativamente a interação dentro das comunidades.

## Comandos

O bot suporta os seguintes comandos:

- `/iniciar`: Prepara o sistema para uma nova rodada de apostas, permitindo o registro de novas apostas.
- `/apostar`: Registra uma aposta para o usuário, aceitando um nome, um CPF e uma sequência de números ou a opção "surpresinha" para números aleatórios.
- `/listar-apostas`: Exibe todas as apostas registradas até o momento, mostrando detalhes dos apostadores e números apostados.
- `/sortear`: Finaliza o registro de apostas e realiza o sorteio, determinando as apostas vencedoras.
- `/resultado`: Mostra os números sorteados, a quantidade de rodadas de sorteio realizadas, a quantidade de apostas vencedoras e os detalhes dos vencedores.
- `/premiacao`: Anuncia os prêmios inusitados concedidos às apostas vencedoras.
- `/ajuda`: Fornece uma lista de todos os comandos disponíveis, com suas descrições e informações sobre os atributos necessários.

## Estrutura do Código

O código está organizado da seguinte forma:

- **Comandos**: Cada comando é implementado como um módulo separado, permitindo clareza e facilidade na manutenção e expansão do bot.
- **Estado do Sorteio**: Gerenciado centralmente para assegurar consistência e facilitar o acesso às informações do sorteio por diferentes partes do bot.
- **Validações e Feedback**: Retornos informativos foram tomados para validar entradas dos usuários e fornecer feedback claro e útil, melhorando a experiência do usuário.

## Por Que Esta Organização?

A organização modular do código facilita a compreensão, manutenção e expansão futura do projeto. A separação de comandos em módulos individuais permite ajustes e adições específicas sem impactar o sistema como um todo. O gerenciamento centralizado do estado do sorteio assegura que todas as operações se baseiem em dados consistentes, e a atenção à validação de entradas e feedback ao usuário visa criar uma experiência de uso positiva e sem fricções.

---

