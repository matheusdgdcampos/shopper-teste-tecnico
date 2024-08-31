# Como rodar

- Crie um arquivo `.env` na raiz do projeto;
- Rode o seguinte comando para subir o container docker `docker compose -f "docker-compose.yml" up -d --build`;

# Dependências

- NestJS;
- date-fns;
- jest;
- mongoose/mongodb;
- Eslint;
- Prettier;

# Pontos de melhoria

- Melhorar a cobertura de testes adicionando testes de integração, E2E, e mais testes de unidade;
- Atualmente a aplicação disponibiliza a imagem temporária em um base64 adicionado na própria base de dados, para fins de finalização do teste, porém, o correto seria adiciona-la em um bucket no S3 ou similares, colocando uma camada de CDN na frente e servindo o endereço fornecido via CDN;
- A imagem poderia vir em um buffer para o backend ao invés de um base64 para melhor manipulação
