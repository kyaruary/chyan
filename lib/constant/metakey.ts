export enum ChyanMetaKey {
  id = "chyan:id",
  onIns = "chyan:handle-ins",
  beforeIns = "chyan:before-ins",
  afterIns = "chyan:after-ins",
  wires = "chyan:auto-wired-wires",
  prepare = "chyan:ins-prepare",
  packing = "chyan:ins-packing",
  wired = "chyan:ins-wired",
  done = "chyan:ins-done",
  noninvasive = "chyan:noninvasive",
}

export enum DesignMetaKey {
  paramTypes = "design:paramtypes",
  propertyType = "design:type",
  returnType = "design:returntype",
}
