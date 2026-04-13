import { describe, expect, test } from "bun:test";

import { getNotesDatabaseId } from "./notion";

describe("getNotesDatabaseId", () => {
  test("falls back to NOTION_THOUGHT_DB_ID when NOTION_DB_ID is missing", () => {
    const originalNotionDbId = process.env.NOTION_DB_ID;
    const originalThoughtDbId = process.env.NOTION_THOUGHT_DB_ID;

    process.env.NOTION_DB_ID = "";
    process.env.NOTION_THOUGHT_DB_ID = "thought-db-id";

    expect(getNotesDatabaseId()).toBe("thought-db-id");

    process.env.NOTION_DB_ID = originalNotionDbId;
    process.env.NOTION_THOUGHT_DB_ID = originalThoughtDbId;
  });
});
