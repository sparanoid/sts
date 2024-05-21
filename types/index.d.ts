export type UptimeState = number

export interface Status {
  /** "miscs" */
  group: string
  /** miscs_cdn-reporter */
  key: string
  /** cdn-reporter */
  name: string
  results: StatusResult[]
  uptime?: number
}

export interface StatusResult {
  status: number
  duration: number
  hostname?: string
  success: boolean
  /** 2024-04-28T08:22:07.19385135Z */
  timestamp: string
  errors?: string[]
  conditionResults?: StatusResultCondition[]
}

export interface StatusResultCondition {
  /** "[CERTIFICATE_EXPIRATION] > 48h" */
  condition: string
  success: boolean
}
