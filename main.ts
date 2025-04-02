import { ArgOptions, cli, Command } from "@kazupon/gunshi";

function logTitle(title: string) {
  console.log("Title is: ", title);
}

export const command: Command<ArgOptions> = {
  name: "test",
  description: "Create a test",
  options: {
    title: {
      type: "string",
      short: "t",
      required: true,
      default: "",
      description: "Test title",
    },
    description: {
      type: "string",
      short: "d",
      description: "Test description [Optional]",
    },
  },
  run: (ctx) => {
    const { title, description } = ctx.values;
    if (title) {
      logTitle(title);
      console.log("Description is: ", description);
    } else {
      console.log("Title is required");
    }
  },
};

if (import.meta.main) {
  cli(Deno.args, command);
}
