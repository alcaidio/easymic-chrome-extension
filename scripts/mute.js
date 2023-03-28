{
  function getElementByXpath(xPath) {
    return document.evaluate(
      xPath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }

  const btn = getElementByXpath(
    "//*[@id='ow3']/div[1]/div/div[13]/div[3]/div[11]/div/div/div[2]/div/div[1]/div/div[2]/span/button"
  );

  if (btn) {
    const style = getComputedStyle(btn);
    const backgroundColor = style.backgroundColor;
    const isMutted = backgroundColor === "rgb(234, 67, 53)";

    if (!isMutted) {
      btn.click();
    }
  }
}
