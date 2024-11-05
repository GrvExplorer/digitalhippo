export function createLandingH1(text: string) {
  const colorText = text.split("  ");
  return (
    <>
      {colorText[0]}
      &nbsp;
      {colorText[1] && <span className="text-primary-foreground bg-primary">&nbsp;{colorText[1]} </span>}
      {colorText[2] && <span className="text-secondary">{colorText[2]}</span>}
    </>
  );
}
