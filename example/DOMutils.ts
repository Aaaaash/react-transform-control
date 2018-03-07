
export function pauseEvent(e: any) {
  e.stopPropagation();
  e.preventDefault();
}


export function isParent(obj: any, parentObj: any) {
  let element = obj;
  while (
    element !== undefined &&
    element !== null &&
    element.tagName.toUpperCase() !== 'BODY'
  ) {
    if (element === parentObj) {
      return true;
    }
    element = element.parentNode;
  }
  return false;
}
