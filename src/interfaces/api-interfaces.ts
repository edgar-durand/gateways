export interface IResponse {
  result: boolean;
  message?: string | null;
  data?: any;
  errors?: string[] | null;
}
export interface IPv4Interface {
 isValid: boolean;
 address?: string;
}
