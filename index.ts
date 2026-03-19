import concurrently from 'concurrently';

concurrently([
   {
      name: 'server',
      cwd: './packages/server',
      command: 'bun --watch run dev',
      prefixColor: 'blue',
   },
   {
      name: 'client',
      cwd: './packages/client',
      command: 'bun --watch run dev',
      prefixColor: 'green',
   },
]);
