import resume from "./resume";
import { STORAGE_LAYOUT } from "../utils/constant";

it("stores a selected picture in both editing modes", () => {
  resume.layout = [
    {
      i: "item_0",
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      value: "",
      origin: "<section></section>"
    }
  ];
  resume.choosenKey = "item_0";

  const dataUrl = "data:image/png;base64,AAAA";
  resume.setPicture(dataUrl);

  expect(resume.layout[0].value).toBe(`![avatar](${dataUrl})`);
  expect(resume.layout[0].origin).toContain(`src="${dataUrl}"`);
  expect(JSON.parse(localStorage.getItem(STORAGE_LAYOUT))[0]).toEqual(
    expect.objectContaining({
      value: `![avatar](${dataUrl})`
    })
  );
});
