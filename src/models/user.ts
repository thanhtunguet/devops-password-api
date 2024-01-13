export class DevopsUser {
  identity: Identity;
  providerDisplayName: string;
  defaultMailAddress: string;
  basicAuthenticationEnabled: boolean;
  sshEnabled: boolean;
  userPreferences: UserPreferences;
  allThemes: AllTheme[];
  typeAheadDisabled: boolean;
  workItemFormChromeBorder: boolean;
  allTimeZones: AllTimeZone[];
  allCultures: AllCulture[];
}

export class AllCulture {
  DisplayName: string;
  OptionalCalendars: OptionalCalendar[];
  LCID: number;
  Language: string;
}

export class OptionalCalendar {
  DisplayName: string;
  DateFormats: DateFormat[];
  TimeFormats: DateFormat[];
}

export class DateFormat {
  Format: string;
  DisplayFormat: string;
}

export class AllTimeZone {
  DisplayName: string;
  Id: string;
}

export class AllTheme {
  DisplayName: string;
  ThemeName: string;
}

export class UserPreferences {
  CustomDisplayName?: any;
  PreferredEmail: string;
  IsEmailConfirmationPending: boolean;
  Theme: string;
  TypeAheadDisabled: boolean;
  TimeZoneId?: any;
  LCID?: any;
  Calendar?: any;
  DatePattern?: any;
  TimePattern?: any;
  ResetEmail: boolean;
  ResetDisplayName: boolean;
  WorkItemFormChromeBorder: boolean;
}

export class Identity {
  IdentityType: string;
  FriendlyDisplayName: string;
  DisplayName: string;
  SubHeader: string;
  TeamFoundationId: string;
  EntityId: string;
  Errors: any[];
  Warnings: any[];
  Domain: string;
  AccountName: string;
  IsWindowsUser: boolean;
  MailAddress: string;
}
