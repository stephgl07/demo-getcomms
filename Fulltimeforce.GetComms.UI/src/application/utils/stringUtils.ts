
const capitalize = (text?: string): string => {
  if(!text) {
    return "";
  }
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

const capitalizeBreadcrumbs = (segment?: string): string => {
  if(!segment) {
    return "";
  }
  return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
}

const capitalizeBreadcrumbLast = (segment: string): string => {
  if(/^[0-9a-fA-F]+$/.test(segment)) {
    return segment;
  }
  else if (segment.endsWith("es")) {
    return capitalizeBreadcrumbs(segment).slice(0, -2);
  } else if (segment.endsWith("s")) {
    return capitalizeBreadcrumbs(segment).slice(0, -1);
  }
  return capitalizeBreadcrumbs(segment);
}

export { capitalizeBreadcrumbs, capitalizeBreadcrumbLast, capitalize };
