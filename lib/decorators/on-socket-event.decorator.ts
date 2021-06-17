import { SetMetadata } from "@nestjs/common";
import { SOCKET_EVENT_METADATA } from "../constants";

export const OnSocketEvent = (event: string) => SetMetadata(SOCKET_EVENT_METADATA, { event });
