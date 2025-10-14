export class ElementStyleUtil {
  public static set(
    element: HTMLElement,
    customers: string,
    value?: any,
    important?: boolean
  ) {
    if (important) {
      element.style.setProperty(customers, value, "important");
    } else {
      element.style.setProperty(customers, value);
    }
  }

  public static get(element: HTMLElement, attributeName: string) {
    return element.style.getPropertyValue(attributeName);
  }

  public static remove(element: HTMLElement, attibuteName: string) {
    element.style.removeProperty(attibuteName);
  }
}
