import { cli, define } from "jsr:@kazupon/gunshi";
import { bold } from "@std/fmt/colors";

import data from "./data.json" with { type: "json" };

type TestList = typeof data;

function getTitles(testList: TestList) {
  console.log(bold(`\nAll Tests (${data.length}):\n`));
  testList.forEach((item, idx) => {
    console.log((idx + 1).toString().padStart(2, "0"), ". ", item.title);
  });
}

function getStartedNotCompleted(testList: TestList) {
  const startedNotCompleted = testList.filter((item) =>
    item.started && !item.completed
  );
  console.log(bold(`\nStarted Tests (${startedNotCompleted.length}):\n`));
  startedNotCompleted.forEach((item, idx) => {
    console.log((idx + 1).toString().padStart(2, "0"), ". ", item.title);
  });
}

function getCompletedAndStarted(testList: TestList) {
  const completedAndStarted = testList.filter((item) =>
    item.completed && item.started
  );
  console.log(bold(`\nCompleted Tests (${completedAndStarted.length}):\n`));
  completedAndStarted.forEach((item, idx) => {
    console.log((idx + 1).toString().padStart(2, "0"), ". ", item.title);
  });
}

function getArchivedItems(testList: TestList) {
  const archived = testList.filter((item) => item.archived);
  console.log(bold(`\nArchived Tests (${archived.length}):`));
  archived.forEach((item, idx) => {
    console.log((idx + 1).toString().padStart(2, "0"), ". ", item.title);
  });
}

export const command = define({
  name: "test",
  description: "Manage tests effectively",
  options: {
    list: {
      type: "boolean",
      short: "l",
      description: "List all tests",
    },
    "list-started": {
      type: "boolean",
      short: "ls",
      description: "List all tests that has been started",
    },
    "list-completed": {
      type: "boolean",
      short: "lc",
      description: "Lists completed tests",
    },
    "list-archived": {
      type: "boolean",
      short: "la",
      description: "List archived tests",
    },
  },
  run: (ctx) => {
    const {
      list,
      "list-archived": listArchived,
      "list-completed": listCompleted,
      "list-started": listStarted,
    } = ctx.values;

    if (list) {
      return getTitles(data);
    } else if (listStarted) {
      return getStartedNotCompleted(data);
    } else if (listCompleted) {
      return getCompletedAndStarted(data);
    } else if (listArchived) {
      return getArchivedItems(data);
    } else {
      console.log("Invalid option, please run with --help/-h for details.");
    }
  },
});

if (import.meta.main) {
  cli(Deno.args, command);
}
