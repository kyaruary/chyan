import { InjectorMetadata, ActionMetadata, ArgumentsMetadata } from "../..";

export * as metadataStorage from "./metadata";

export type MetadataStorage = {
  injectorMetadataMap: InjectorMetadataMap;
  actionMetadataMap: ActionMetadataMap;
  argumentMetadataMap: ArgumentMetadataMap;
  propertyMetadataMap: PropertyMetadataMap;
};

export type InjectorMetadataMap = Map<string, InjectorMetadata>;

export type ActionMetadataMap = Map<string, Map<string, ActionMetadata>>;

export type ArgumentMetadataMap = Map<string, Map<string, ArgumentsMetadata>>;

export type PropertyMetadataMap = Map<string, Function[]>;
