// @flow

import * as statusType from "../types/status-type";

export function getStatusColor(status: string) {
  switch (status) {
    case statusType.ACTIVE:
      return "status-ok";
    case statusType.DELETED:
      return "status-error";
    case statusType.MERGED:
      return "status-warning";
    default:
      return "status-unknown";
  }
}
