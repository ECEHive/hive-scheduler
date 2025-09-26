# Hive Scheduler

Shift scheduling system for The Hive Makerspace at Georgia Tech.

## Setup

1. Clone the repository.

   `git clone https://github.com/ECEHive/hive-scheduler`
   
3. Open the repository in the editor of your choice.
4. If you are using VS Code and have Docker installed, you can open the folder in a developer container.
5. Install dependencies

   `pnpm install`

## Running

1. Run the API,

    `cd ./apps/api && pnpm start`
  
2. Run the client,

    `cd ./apps/client && pnpm dev`

Both the client and the server must be running for everything to be functional. The client will hot-reload, the server will not.

![Alt](https://repobeats.axiom.co/api/embed/4f681a06b224ae315d44b257b17f52576bc6eefc.svg "Repobeats analytics image")
