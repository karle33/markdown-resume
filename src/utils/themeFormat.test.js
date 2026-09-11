import { toggleThemeText } from "./themeFormat";

it("adds and removes Markdown theme markers", () => {
  expect(toggleThemeText("电话：13812345678", "13812345678", "`")).toBe(
    "电话：`13812345678`"
  );
  expect(toggleThemeText("电话：`13812345678`", "13812345678", "`")).toBe(
    "电话：13812345678"
  );
});

it("adds and removes normal-mode theme tags", () => {
  expect(
    toggleThemeText(
      "<section><p>电话：13812345678</p></section>",
      "13812345678",
      "<code>",
      "</code>"
    )
  ).toBe("<section><p>电话：<code>13812345678</code></p></section>");

  expect(
    toggleThemeText(
      "<section><p>电话：<code>13812345678</code></p></section>",
      "13812345678",
      "<code>",
      "</code>"
    )
  ).toBe("<section><p>电话：13812345678</p></section>");
});

it("returns null when the selected text is not in the content", () => {
  expect(toggleThemeText("简历", "电话", "`")).toBeNull();
});
