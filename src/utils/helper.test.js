import { parseImportedLayout } from "./helper";

const validLayout = [
  {
    i: "item_0",
    x: 0,
    y: 0,
    w: 4,
    h: 2,
    value: "测试",
    origin: "<section><p>测试</p></section>"
  }
];

it("parses a valid imported layout", () => {
  expect(parseImportedLayout(JSON.stringify(validLayout))).toEqual(validLayout);
});

it("rejects invalid JSON without changing data", () => {
  expect(() => parseImportedLayout("not-json")).toThrow("JSON");
});

it("rejects malformed or duplicate layout items", () => {
  const duplicate = validLayout.concat(validLayout[0]);
  expect(() => parseImportedLayout(JSON.stringify(duplicate))).toThrow(
    "布局格式不正确"
  );
  expect(() => parseImportedLayout(JSON.stringify({ layout: validLayout }))).toThrow(
    "有效的简历布局"
  );
});
