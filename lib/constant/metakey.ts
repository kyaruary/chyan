export enum ChyanMetaKey {
  id = "chyan:id",
  onIns = "chyan:handle-ins",
  beforeIns = "chyan:before-ins",
  afterIns = "chyan:after-ins",
  wires = "chyan:auto-wired-wires",
  preparing = "chyan:ins-preparing",
  packing = "chyan:ins-packing",
  wiring = "chyan:ins-wiring",
  done = "chyan:ins-done",
}

export enum DesignMetaKey {
  paramTypes = "design:paramtypes",
  propertyType = "design:type",
  returnType = "design:returntype",
}
